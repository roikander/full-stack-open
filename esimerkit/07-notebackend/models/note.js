// ota käyttöön kirjastossa dotenv(tiedosto .env) määritellyt ympäristömuuttujat
require("dotenv").config();
// Mongoose-koodi on omassa tiedostossaan note.js, määrittää modelin Note         
const mongoose = require("mongoose");

mongoose.set("strictQuery", false); 

// Tietokannan yhteysosoite välitetään sovellukselle
// MONGODB_URI ympäristömuuttujan kautta, koska sen
// kovakoodaaminen sovellukseen ei ole järkevää
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

// muodosta yhteys tietokantaan, parametrina tietokannan url ja yhteystapa ipv4 
mongoose.connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// määrittelee minkälaisia dokumentteja tämä kokoelma sisältää
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// muotoilee ylhäällä määritellyt Mongoosen palauttamat oliot haluttuun muotoon
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Model:it on vastuussa dokumenttien lukemisesta ja luomisesta,
// eka parametri 'Note' kertoo että talleta oliot kyseisen
// parametrin/sanan monikkomuotoon alkaen pienellä kirjaimella,
// sen johdosta syntyy kokoelma nimeltään notes.
// Nodessa moduulien export tapahtuu erilailla kuin esimerkiksi Reactissa,
// jossa syntaksi on: export default <komponentti>.
module.exports = mongoose.model("Note", noteSchema);
