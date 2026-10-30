// määrittelee skeeman eli millaisen mallin mukaan käyttäjät tehdään
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  // taulukko joka sisältää blogien id:t ja viittauksen Blog-modeliin (blog.js)
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // hajautettua salasanaa ei tule paljastaa
    delete returnedObject.passwordHash
  }
})

// luo mallin, joka määrittelee, millaisia käyttäjädokumentteja luodaan.
const User = mongoose.model('User', userSchema)

module.exports = User
