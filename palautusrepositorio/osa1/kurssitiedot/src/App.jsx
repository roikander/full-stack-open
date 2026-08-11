// Header renderöi kurssin nimen
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// Luo Part-komponentin avulla kolme komponenttia
const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

// Part-komponentista luodaan kolme komponenttia,
// koska sitä käytetään Contentissa kolme kertaa
const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

// Total renderöi tehtävien yhteismäärän
const Total = (props) => {
  return (
    <div>

    </div>
  )
}

// App säilyttää sovelluksen dataa ja välittää lapsikomponenteille 
// propsien avulla niiden tarvitseman datan
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
