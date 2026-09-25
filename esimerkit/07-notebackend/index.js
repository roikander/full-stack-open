// ota käyttöön kirjastossa dotenv(tiedosto .env) määritellyt ympäristömuuttujat
require("dotenv").config();
// expressin avulla palvelimen koodaus on jouhevampaa
const express = require("express");
// importtaa tiedostosta note.js modelin, Noden moduuliensiirtosyntaksilla
const Note = require("./models/note");

const app = express();

let notes = [];

// Itse määritelty middleware, joka tulostaa npm-konsoliin
// palvelimelle tulevien pyyntöjen perustietoja,
// lopussa oleva next() siirtää kontrollin seuraavalle middlewarelle.
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);
// Tarvitaan Expressin middleware static, jotta saa renderöityä tiedoston
// index.html joka sisältää elementin root, jonka kautta sovellus pääsee
// käsiksi komponenttiin App, joka sisältää esim. muistiinpanot, em. seurauksena
// pyyntö juureen ei renderöi <h1>Hello World!</h1> vaan komponentin App.
app.use(express.static("dist"));
// Expressin json-parser käyttöön -> lähettettyyn dataan pääsee helposti käsiksi
app.use(express.json());

// Tapahtumankäsittelijäfunktiolla on kaksi parametria. Näistä ensimmäinen eli
// request sisältää kaikki HTTP-pyynnön tiedot ja toisen parametrin response:n
// avulla määritellään, miten pyyntöön vastataan.
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// Polkuun /api/notes tulevaan pyyntöön vastataan jokaisella muistiinpanolla,
// sen johdosta että find-metodille annettu parametri on {},
// response-olion json-metodi muuttaa muistiinpanot JSON-muotoiseksi merkkijonoksi.
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// Yksittäisen resurssin voi hakea antamalla polkuun/URLiin kaksoispisteen
// jälkeen haettavasta kohteesta löytyvä parametri (tässä id),
// käsiksi siihen päästään request-olion avulla.
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// Uusi muistiinpano lisätään POST-pyynnöllä, jos kenttä content puuttuu -> 400.
// Note-rakentajafunktio luo uuden note-olion skeeman mukaisesti model:in avulla,
// jos pyynnöstä puuttuu kenttä important -> aseta false siihen.
// luotu note-olio tallennetaan save-metodilla.
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// Poisto tapahtuu tekemällä HTTP DELETE ‑pyyntö resurssin urliin.
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// Middleware jonka ansiosta saadaan polkujen käsittelemättömistä
// virhetilanteista JSON-muotoinen virheilmoitus.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// kuuntelee porttia 3001 tiedoston .env ympäristömuuttujan PORT avulla
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
