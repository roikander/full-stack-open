import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  // Jotta sivu päivittyy oikein kun uusia muistiinpanoja lisätään on parasta
  // sijoittaa muistiinpanot komponentin App tilaan
  const [notes, setNotes] = useState([])
  // tila lomakkeen syötettä varten
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Ensin suoritetaan komponentin runko(myös efektin jälkeinen loggaus), heti 
  // sen jälkeen suoritetaan efekti/funktio getAll() joka hakee datan palvelimelta
  // Lopussa oleva parametri [] tarkoittaa että suoritetaan efekti 
  // ainoastaan komponentin ensimmäisen renderöinnin jälkeen.
  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  // Tapahtumankäsittelijä JSX-osiossa olevan lomakkeen tapahtumaan onSubmit,
  // event.preventDefault() estää lomakkeen lähetyksen oletusarvoisen toiminnan,
  // joka aiheuttaisi mm. sivun uudelleenlatautumisen, id-kentän generointi on 
  // parempi jättää palvelimen vastuulle moduulissa NoteService funktiossa create.
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    // noteObject lähetetään/lisätään palvelimelle tiedostoon db.json axioksen
    // metodilla post, moduulissa noteService, funktiolla create 
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // Tapahtumankäsittelijä joka varsinaisesti muuttaa muistiinpanon tärkeyden,
  // muuttamalla kentän important päinvastaiseksi jos id mätsää.
  // Muutoksen jälkeen uusi muistiinpano lähetetään PUT-pyynnöllä korvaamaan 
  // vanha axioksen put-metodilla moduulissa noteService sen funktiolla update.
  // Lopussa on virheenkäsittelijä toteutettu metodilla catch.
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
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
  // tapahtumankäsittelijä on suoraan napissa, NOT-operaattori eli ! muuttaa
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
