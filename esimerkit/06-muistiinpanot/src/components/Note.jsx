// renderöi jokaisen muistiinpanon content-kentän li-elementtinä
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

export default Note
