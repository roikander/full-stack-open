// Total renderöi tehtävien yhteismäärän. Ei voida toteuttaa tiiviinä
// nuolifunktiona, koska sisältää muutakin kuin returnin.
const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((acc, x) => acc + x, 0)

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

// Jokainen Contentin renderöimä Part-komponentti 
// renderöi yhden kurssin osan nimen ja tehtävien lukumäärän.
const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

// tiivis nuolifunktio 
const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
)

// äärimmäisen tiivis nuolifunktio  
const Header = ({ course }) => <h1>{course}</h1>

// Course sisältää komponentit (Header ja Content), 
// joiden vastuulle tulee kurssin nimen ja osien renderöinti
const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
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
