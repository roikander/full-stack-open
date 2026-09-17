// expressin avulla palvelimen koodaus on jouhevampaa
const express = require("express");
const app = express();

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

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

// Expressin json-parser käyttöön -> lähettettyyn dataan pääsee helposti käsiksi
app.use(express.json());
app.use(requestLogger);
// Tarvitaan Expressin middleware static, jotta saa renderöityä tiedoston
// index.html joka sisältää elementin root, jonka kautta sovellus pääsee
// käsiksi komponenttiin App, joka sisältää esim. muistiinpanot, em. seurauksena
// pyyntö juureen ei renderöi <h1>Hello World!</h1> vaan komponentin App.
app.use(express.static("dist"));

// Tapahtumankäsittelijäfunktiolla on kaksi parametria. Näistä ensimmäinen eli
// request sisältää kaikki HTTP-pyynnön tiedot ja toisen parametrin response:n
// avulla määritellään, miten pyyntöön vastataan.
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// Polkuun /api/notes ja tulleisiin pyyntöihin vastataan muistiinpanot taulukolla,
// joka muutetaan response-olion json-metodilla JSON-muotoiseksi merkkijonoksi.
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// Yksittäisen resurssin voi hakea antamalla polkuun/URLiin kaksoispisteen
// jälkeen haettavasta kohteesta löytyvä parametri (tässä id),
// käsiksi siihen päästään request-olion avulla.
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// Poisto tapahtuu tekemällä HTTP DELETE ‑pyyntö resurssin urliin.
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// Luo uudelle muistiinpanolle uniikin id:n, joka on
// yhdellä suurempi kuin tällä hetkellä suurin id.
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map((n) => Number(n.id)))
    : 0;
  return String(maxId + 1);
};

// uusi muistiinpano lisätään POST-pyynnöllä, jos kenttä content puuttuu -> 400,
// jos kenttä important puuttuu -> aseta false siihen
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

// Middleware jonka ansiosta saadaan polkujen käsittelemättömistä
// virhetilanteista JSON-muotoinen virheilmoitus.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// käyttöön tulee ympäristömuuttujassa PORT määritelty portti tai 
// 3001 jos ympäristömuuttuja PORT ei ole määritelty.
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
