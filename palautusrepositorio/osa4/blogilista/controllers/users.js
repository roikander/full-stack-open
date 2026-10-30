// käyttäjien reitteihin tulevat pyynnöt määrittelevä reittiolio usersRouter
const usersRouter = require('express').Router()
// lataa mallin ja ottaa sen käyttöön allaolevasta tiedostosta
const User = require('../models/user')
const bcrypt = require('bcrypt')

// reittioliolle on määritelty jo tiedostossa app.js polku 'api/users'
// jos kyseessä on eka POST-pyyntö polkuun, luo uuden tietokantakokoelman
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // luo annetusta salasanasta hajautetun salasanan passwordHash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // luo uuden käyttäjän, 
  const user = new User({
    username,
    name,
    passwordHash,
  })

  // ja tallentaa sen käyttäjädokumentin tietokantaan
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
