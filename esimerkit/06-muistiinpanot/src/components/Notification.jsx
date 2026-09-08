// Jos propsin message arvo on null, ei renderöidä mitään virheilmoitusta. 
// Muussa tapauksessa renderöidään propsin (message) sisältämä viesti. 
// Elementille on liitetty tyylien lisäämistä varten luokka error.
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification
