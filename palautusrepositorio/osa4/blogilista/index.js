const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>blogilista</h1>')
})

const PORT = 3003
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
