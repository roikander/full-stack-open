// Header renderöi kurssin nimen
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// Content delegoi vanhemmaltaan App saamansa propsit ja renderöinnin Part:ille
const Content = (props) => {
  return (
    <div>
      <Part name1={props.name1} exercises1={props.exercises1} />
      <Part name2={props.name2} exercises2={props.exercises2} />
      <Part name3={props.name3} exercises3={props.exercises3} />
    </div>
  )
}

// Part renderöi kurssin osien nimet ja tehtävämäärän
const Part = (props) => {
  return (
    <div>
      <p>
        {props.name1} {props.exercises1}
      </p>
      <p>
        {props.name2} {props.exercises2}
      </p>
      <p>
        {props.name3} {props.exercises3}
      </p>
    </div>
  )
}

// Total renderöi tehtävien yhteismäärän
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

// App säilyttää sovelluksen dataa ja välittää lapsikomponenteille 
// propsien avulla niiden tarvitseman datan
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content name1={part1.name} exercises1={part1.exercises} />
      <Content name2={part2.name} exercises2={part2.exercises} />
      <Content name3={part3.name} exercises3={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </>
  )
}

export default App
