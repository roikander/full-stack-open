import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  // Jotta sivu päivittyy oikein kun uusia muistiinpanoja lisätään on parasta
  // sijoittaa muistiinpanot komponentin App tilaan
  const [notes, setNotes] = useState([])
  // tila lomakkeen syötettä varten
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // ensin suoritetaan komponentin runko(myös efektin jälkeinen loggaus), heti 
  // sen jälkeen suoritetaan efekti/funktio joka hakee datan palvelimelta
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  // tapahtumankäsittelijä JSX-osiossa olevan lomakkeen tapahtumaan onSubmit
  // event.preventDefault() estää lomakkeen lähetyksen oletusarvoisen toiminnan,
  // joka aiheuttaisi mm. sivun uudelleenlatautumisen
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length + 1),
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  // synkronoi syötekenttään tehdyt muutokset komponentin App tilaan newNote
  // event.target.value on lomakkeen syötekentässä sillä hetkellä oleva arvo
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // Jos ehto showAll on true näytä kaikki muistiinpanot jos showAll on false
  // näytä vain muistiinpanot joiden kenttä important on true.
  // JSX:ssä on nappi jolla voi säätää tilan showAll arvoa, 
  // tapahtumankäsittelijä on suoraan napissa, NOT-operaattori (!) muuttaa
  // showAll-tilan päinvastaiseksi, napin teksti riippuu showAll-arvosta:
  // show {showAll ? 'important' : 'all'}
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  // Metodi map() suorittaa jokaiselle notes-taulukon alkiolle sulkeisiin 
  // määritellyn funktion, eli lähettää Note-komponentille muistiinpanon 
  // id-kentän avaimeksi, jotta renderöinti sujuu ok. 
  // Se myös lähettää itse muistiinpano-olion Notelle.
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
