// Komponentti nimeltään Hello määriteltynä JS-funktiona eli () => ...,
// joka sijoitetaan vakioarvoiseen muuttujaan Hello.
// Hello sijoittaa destrukturoinnin avulla saamansa propsit suoraan muuttujiin
// name ja age.
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by
      <a href="https://github.com/roikander">roikander</a>
    </div>
  )
}

// Ylimpänä oleva juurikomponentti App käyttää alikomponenttia Hello kaksi kertaa, 
// se myös renderöi sen ja lisäksi se renderöi otsikon h1.
const App = () => {
  const nimi = "Pekka"
  const ika = 10

  return (
    <>
      <h1>eka-react-sovellus</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      <Footer />
    </>
  )
}

// muista exportata pääkomponentti
export default App
