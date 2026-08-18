import { useState } from 'react'

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
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>

      <h1>statistics</h1>

      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    </>
  )
}

export default App
