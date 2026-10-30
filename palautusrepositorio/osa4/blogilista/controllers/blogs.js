// blogien reitteihin tulevat pyynnöt määrittelevä reittiolio blogsRouter
const blogsRouter = require('express').Router()
// lataa mallin ja ottaa sen käyttöön allaolevasta tiedostosta
const Blog = require('../models/blog')

// reittioliolle on määritelty jo tiedostossa app.js polku 'api/blogs'
// hakee tietokannasta kaikki blogit mongoosen metodilla find
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// jos kyseessä on eka POST-pyyntö polkuun, luo uuden tietokantakokoelman
// jos kenttää likes ei ole nimetty tai sen arvo on tyhjä, asetetaan 0 siihen
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // luo uuden blogin, 
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  // ja tallentaa sen blogidokumentin tietokantaan
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
