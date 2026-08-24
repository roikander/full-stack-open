import Note from './components/Note'

const App = ({ notes }) => {
  // Suorittaa jokaiselle notes-taulukon alkiolle sulkeisiin määritellyn funktion,
  // eli lähettää Note-komponentille muistiinpanon id-kentän avaimeksi, jotta
  // renderöinti sujuu ok. Se myös lähettää itse muistiinpano-olion Notelle.
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
