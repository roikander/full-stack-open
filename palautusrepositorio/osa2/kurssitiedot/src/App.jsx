const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

// Jokainen Contentin renderöimä Part-komponentti (ylhäällä)
// renderöi yhden kurssin osan nimen ja tehtävien lukumäärän.
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

// tiivis nuolifunktio mahdollinen koska Header ei sisällä muuta kuin returnin
const Header = ({ course }) => <h1>{course}</h1>

// Course sisältää komponentit (Header ja Content), 
// joiden vastuulle tulee kurssin nimen ja osien renderöinti
const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
