import { useState } from 'react'

// Display saa ainoastaan propsin kentän counter joka on sovelluksen tila 
// eli laskimen arvo, sen se renderöi, tiivis nuolifunktio mahdollinen koska
// Display ei sisällä muuta kuin returnin
const Display = ({ counter }) => <div>{counter}</div>

// Button saa propsien avulla nappeihin tekstit jotka se renderöi, sekä
// joka napille asianmukaisen tapahtumankäsittelijän, tiivis nuolifunktio 
// mahdollinen koska Button ei sisällä muuta kuin returnin
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

// kun sovellus käynnistyy, suoritetaan juurikomponentin App koodi
const App = () => {
  // luo tilamuuttujan counter joka saa alkuarvoksi 0, funktio setCounter 
  // muuttaa komponentin App tilaa aiheuttaen uudelleenrenderöitymisen
  const [counter, setCounter] = useState(0)
  console.log('renderöi laskimen arvon ollessa', counter)

  // napin plus tapahtumankäsittelijä increaseByFive on eriytetty omaksi 
  // App-komponentin sisäiseksi apufunktioksi, tapahtumankäsittelijänfunktiolle 
  // annettu parametri (counter + 5) määrittää että tilaa counter lisätään 5:llä
  const increaseByFive = () => {
    console.log('lisää, arvo ennen lisäystä', counter)
    setCounter(counter + 5)
  }

  const decreaseByFive = () => { 
    console.log('vähennä, arvo ennen vähennystä', counter)
    setCounter(counter - 5)
  }

  const setToZero = () => {
    console.log('palauta arvo nollaan, arvo ennen palautusta', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button
        onClick={increaseByFive}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />
      <Button
        onClick={decreaseByFive}
        text='minus'
      />
    </div>
  )
}

export default App
