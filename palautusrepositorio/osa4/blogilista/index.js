require('dotenv').config()
const express = require('express')
const Blog = require('./models/blog')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>bloglist</h1>')
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
