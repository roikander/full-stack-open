// blogien reitteihin tulevat pyynnöt määrittelevä reittiolio blogsRouter
const blogsRouter = require('express').Router()
// lataa mallin ja ottaa sen käyttöön allaolevasta tiedostosta
const Blog = require('../models/blog')
const User = require('../models/user')

// reittioliolle on määritelty jo tiedostossa app.js polku 'api/blogs'
// hakee tietokannasta kaikki blogit mongoosen metodilla find
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// jos kyseessä on eka POST-pyyntö polkuun, luo uuden tietokantakokoelman
// jos kenttää likes ei ole nimetty tai sen arvo on tyhjä, asetetaan 0 siihen
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // etsii löytyykö tietokannasta pyynnön tehnyt käyttäjä/id
  // body.userId -> pyynnössä id-kenttä pitää olla muodossa "userId": "<...>"
  const user = await User.findById(body.userId)
  
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  // luo uuden blogin, 
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  // sekä tallentaa sen blogidokumentin tietokantaan ja
  const savedBlog = await blog.save()
  // uudesta tallennetusta blogista id talletetaan user-olion kenttään blogs
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter