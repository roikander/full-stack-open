const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({ name, parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((acc, x) => acc + x, 0)

  return (
    <div>
      <h2>{name}</h2>

      {parts.map(part =>
        <Part name={part.name} exercises={part.exercises} 
        key={part.id} total={total}
        />
      )}

      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <Content name={course.name} key={course.id} parts={course.parts} />
      )}
    </div>
  )
}

export default Course
