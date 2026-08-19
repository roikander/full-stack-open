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
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </div>
  )
}

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [grade, setGrade] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)

    const updatedAll = updatedGood + neutral + bad
    setAll(updatedAll)

    const updatedGrade = grade + 1
    setGrade(updatedGrade)

    setAverage(updatedGrade / updatedAll)

    setPositive(updatedGood / updatedAll * 100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedAll = updatedNeutral + good + bad
    setAll(updatedAll)

    setPositive(good / updatedAll * 100)
  }

  const handleBadClick = () => {
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
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
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
