// kaikki reitit on liitetty allaolevaan router-olioon ja tähän moduuliin
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// reittioliolle on määritelty jo tiedostossa app.js polku '/api/blogs'
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
