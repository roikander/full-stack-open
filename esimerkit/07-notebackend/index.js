// ota käyttöön kirjastossa dotenv(tiedosto .env) määritellyt ympäristömuuttujat
require('dotenv').config()
// expressin avulla palvelimen koodaus on jouhevampaa
const express = require('express')
// importtaa tiedostosta note.js modelin, Noden moduuliensiirtosyntaksilla
const Note = require('./models/note')

const app = express()

// Itse määritelty middleware, joka tulostaa npm-konsoliin
// palvelimelle tulevien pyyntöjen perustietoja,
// lopussa oleva next() siirtää kontrollin seuraavalle middlewarelle.
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// Virheenkäsittelijämiddleware tarkastaa onko kyse CastError-poikkeuksesta
// eli virheellisestä olio-id:stä tai onko skeemassa määriteltyjä
// validointisääntöjä rikottu jos ei ole, se siirtää funktiolla next
// virheenkäsittelyn Expressin oletusarvoisen virheidenkäsittelijän hoidettavaksi.
const errorHandler = (error, request, response, next) => {
  console.error('Virheinfoa:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Tarvitaan Expressin middleware static, jotta saa renderöityä tiedoston
// index.html joka sisältää elementin root, jonka kautta sovellus pääsee
// käsiksi komponenttiin App, joka sisältää esim. muistiinpanot, em. seurauksena
// pyyntö juureen ei renderöi <h1>Hello World!</h1> vaan komponentin App.
app.use(express.static('dist'))
// Expressin json-parser käyttöön -> lähettettyyn dataan pääsee helposti käsiksi
app.use(express.json())
app.use(requestLogger)

// Tapahtumankäsittelijäfunktiolla on kaksi parametria. Näistä ensimmäinen eli
// request sisältää kaikki HTTP-pyynnön tiedot ja toisen parametrin response:n
// avulla määritellään, miten pyyntöön vastataan.
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Polkuun /api/notes tulevaan pyyntöön vastataan jokaisella muistiinpanolla,
// sen johdosta että find-metodille annettu parametri on {},
// response-olion json-metodi muuttaa muistiinpanot JSON-muotoiseksi merkkijonoksi.
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

// Yksittäisen resurssin voi hakea antamalla polkuun/URLiin kaksoispisteen
// jälkeen haettavasta kohteesta löytyvä parametri (tässä id),
// käsiksi siihen päästään Mongoosen Model.findById() ja request-olion avulla.
// Jos haettua id:tä ei löydy palautetaan virhekoodi 404, jos haettu id on
// väärässä muodossa funktio next siirtää virhetilanteen virheenkäsittelijälle.
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Note-rakentajafunktio luo uuden note-olion skeeman mukaisesti model:in avulla,
// jos pyynnöstä puuttuu kenttä important -> aseta false siihen.
// Luotu note-olio tallennetaan save-metodilla. Lopussa validointivirheet napataan
// kiinni ja ja annetaan virheenkäsittelijämiddlewaren huolehdittavaksi
app.post('/api/notes', (request, response, next) => {
  const body = request.body
  console.log(body)

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

// Muokkaustoiminto, jolla voi muuttaa muistiinpanon tärkeyttä, jos tietokannasta
// ei löydy haettua id:tä => 404, jos löytyy päivitetään sen content- ja
// important-kentät pyynnön mukana tulleella datalla.
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

// Poisto tapahtuu Mongoosen metodilla Model.findByIdAndDelete(),
// mahdollinen virhe siirretään virheenkäsittelijälle errorHandler.
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      console.log(result)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// Middleware jonka ansiosta saadaan polkujen käsittelemättömistä
// virhetilanteista JSON-muotoinen virheilmoitus.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

// kuuntelee porttia 3001 tiedoston .env ympäristömuuttujan PORT avulla
const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
