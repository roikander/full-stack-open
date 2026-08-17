import { useState } from 'react'

// Nappienpainallushistoria eli taulukko allClicks näytetään vain jos
// nappeja on painettu, joten tässä toteutuu ehdollinen renderöinti.
// Metodi join() muodostaa taulukosta merkkijonon, joka sisältää taulukon 
// alkiot erotettuina parametrina olevalla merkillä eli välilyönnillä
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

// Button saa propsien avulla nappeihin tekstit jotka se renderöi, sekä
// joka napille asianmukaisen tapahtumankäsittelijän, tiivis nuolifunktio 
// mahdollinen koska Button ei sisällä muuta kuin returnin
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // Tila left laskee vasemmanpuoleiset painallukset
  // tilan setterifunktiolla setLeft. Tilan päivittäminen
  // tehdään setterifunktion avulla, oli kyseessä sitten
  // numero kuten tässä tai olio tai taulukko kuten alempana.
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  // tila allClicks muistaa nappienpainallushistorian taulukon ansiosta
  const [allClicks, setAll] = useState([])
  // tila total pitää lukua kaikkien nappienpainallusten yhteismäärästä
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    // concat toimii siten, että se ei muuta olemassa olevaa taulukkoa 
    // vaan luo uuden taulukon, johon uusi alkio on lisätty
    setAll(allClicks.concat('L'))
    // updatedLeft on ratkaisu ongelmaan "tilan päivitys tapahtuu Reactissa 
    // asynkronisesti (asynkroninen = ei reaaliaikainen)"
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    // ilman updatedLeftia tila total näyttäisi yhtä liian vähän
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(updatedRight + left)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
        <p>total {total}</p>
      </div>
    </div>
  )
}

export default App
