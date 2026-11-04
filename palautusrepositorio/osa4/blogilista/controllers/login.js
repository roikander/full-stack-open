// kirjautumisesta vastaava kooditiedosto
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// reittioliolle on määritelty jo tiedostossa app.js polku 'api/login'
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // jos pyynnössä annetun käyttäjän etsinnän tulos käyttäjädokumenteista ei
  // ole null, vertaa onko salasana hajautettuna oikein metodilla bcrypt.compare
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // jos salasana on oikein luodaan digitaalisesti allekirjoitetut valtuudet
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
