import { useState } from 'react'

const App = () => {
  // luo tilamuuttujan timer joka saa alkuarvoksi 0, 
  // funktio setTimer muuttaa tilaa
  const [timer, setTimer] = useState(0)

  const [counter, setCounter] = useState(0)

  // tilan timer arvo kasvaa yhdellä 1000 ms välein 
  setTimeout(
    () => setTimer(timer + 1),
    1000
  )

  // Renderöi ajastimen lukeman.
  // Renderöi napin nimeltä plus, sitä klikkaamalla tapahtumankäsittelijäfunktiolle 
  // setCounter annettu parametri kasvattaa tilan counter arvoa viidellä.
  // Renderöi laskimen lukeman.
  return (
    <div>
      <div>{timer}</div>
      <button onClick={() => setCounter(counter + 5)}>
        plus
      </button>
      <div>{counter}</div>
    </div>
  )
}

export default App
