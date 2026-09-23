// erillinen kokeilusovellus/tiedosto mongodb:tä ja mongoosea varten
const mongoose = require("mongoose");

// process.argv = ohjelman käynnistyksessä annetut komentoriviargumentit.
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// Ottaa komentoriviargumenttien kolmannen arvon, asettaa sen salasanaksi
// muuttujaan password ja käyttää sitä kirjautumiseen muuttujassa url.
const password = process.argv[2];
const url =
  `mongodb+srv://roikander_db_user:${password}@cluster0.tiadrfo.mongodb.net/noteApp?appName=Cluster0`;

mongoose.set("strictQuery", false);
// muodosta yhteys tietokantaan, parametrina tietokannan url ja yhteystapa ipv4
mongoose.connect(url, { family: 4 });

// määrittelee minkälaisia dokumentteja tämä kokoelma sisältää
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Model:it on vastuussa dokumenttien lukemisesta ja luomisesta,
// eka parametri 'Note' kertoo että talleta oliot kyseisen
// parametrin/sanan monikkomuotoon alkaen pienellä kirjaimella,
// sen johdosta syntyy kokoelma nimeltään notes.
const Note = mongoose.model("Note", noteSchema);

// Hakee tärkeät muistiinpanot, jos find-metodin parametri olisi
// tyhjä taulukko {}, palautettaisiin kaikki muistiinpanot.
Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

// luo uuden note-olion skeeman mukaisesti, model:in avulla
/*const note = new Note({
  content: 'One More Time',
  important: false,
})

// Ylläluotu note-olio tallennetaan save-metodilla ja
// lopuksi sammutetaan tietokantayhteys.
note.save().then(result => {
  console.log('note saved!')
  console.log(result.important)     // true tai false
  mongoose.connection.close()
})*/
