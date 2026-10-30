// kaikki API-reitit on liitetty allaolevaan router-olioon ja tähän moduuliin
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// reittioliolle on määritelty jo tiedostossa app.js polku 'api/blogs'
// hakee tietokannasta blogit mongoosen metodilla find
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// jos kenttää likes ei ole nimetty tai sen arvo on tyhjä, asetetaan 0 siihen
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
