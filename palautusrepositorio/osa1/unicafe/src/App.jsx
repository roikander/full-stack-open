import { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } 

  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [grade, setGrade] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const h2ndleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)

    const updatedAll = updatedGood + neutral + bad
    setAll(updatedAll)

    const updatedGrade = grade + 1
    setGrade(updatedGrade)

    setAverage(updatedGrade / updatedAll)

    setPositive(updatedGood / updatedAll * 100)
  }

  const h2ndleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedAll = updatedNeutral + good + bad
    setAll(updatedAll)

    setPositive(good / updatedAll * 100)
  }

  const h2ndleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedAll = updatedBad + good + neutral
    setAll(updatedAll)

    const updatedGrade = grade - 1
    setGrade(updatedGrade)

    setAverage(updatedGrade / updatedAll)

    setPositive(good / updatedAll * 100)
  }

  return (
    <>
      <h1>give feedback</h1>

      <div>
        <button onClick={h2ndleGoodClick}>good</button>
        <button onClick={h2ndleNeutralClick}>neutral</button>
        <button onClick={h2ndleBadClick}>bad</button>
      </div>

      <h1>statistics</h1>

      <div>
        <Statistics good={good} neutral={neutral} bad={bad}
          all={all} average={average} positive={positive} />
      </div>
    </>
  )
}

export default App
