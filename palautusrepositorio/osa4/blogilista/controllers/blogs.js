// kaikki reitit on liitetty allaolevaan router-olioon ja tähän moduuliin
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// reittioliolle on määritelty jo tiedostossa app.js polku 'api/blogs'
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
