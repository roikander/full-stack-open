// Renderöi jokaisen muistiinpanon content-kentän li-elementtinä,
// sisältää myös napin jolla important-kenttää voi muuttaa.
const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
