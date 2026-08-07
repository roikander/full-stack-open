// Komponentti nimeltään Hello määriteltynä JS-funktiona eli () => {...},
// joka sijoitetaan vakioarvoiseen muuttujaan Hello.
// Se käyttää juurikomponentilta App parametreikseen saamiaan propseja.
const Hello = (props) => {
  // tulostaa dev toolsin konsoliin props-olion arvon 
  console.log(props)
  return (
    <div>
      Hello {props.name}, you are {props.age} years old
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

// ylimpänä oleva juurikomponentti App käyttää alikomponenttia Hello, 
// se myös renderöi sen ja lisäksi se renderöi otsikon h1
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
