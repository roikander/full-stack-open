/*require('dotenv').config()
const express = require('express')
const Blog = require('./models/blog')

const app = express()*/

const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')

/*const errorHandler = (error, request, response, next) => {
  console.error('Virheinfoa:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>bloglist</h1>')
})

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response, next) => {
  console.log(request.body)
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})*/

app.listen(config.PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${config.PORT}`)
})
