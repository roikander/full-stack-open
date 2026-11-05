// blogien reitteihin tulevat pyynnöt määrittelevä reittiolio blogsRouter
const blogsRouter = require('express').Router()
// lataa mallin ja ottaa sen käyttöön allaolevasta tiedostosta
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// reittioliolle on määritelty jo tiedostossa app.js polku 'api/blogs'
// hakee tietokannasta kaikki blogit mongoosen metodilla find
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// poimii POST-pyynnössä annetusta Authorization-headerista Bearer-skeeman
// mukaisen tunnisteen joka varmistetaan alempana metodilla jwt.verify
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// jos kyseessä on eka POST-pyyntö polkuun, luo uuden tietokantakokoelman
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // etsii löytyykö käyttäjädokumenteista pyynnön tehneen käyttäjän käyttäjä/id
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  // luo uuden blogin, jos likes ei ole nimetty tai sen arvo on tyhjä, 0 siihen
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