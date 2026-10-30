// määrittelee ainostaan skeeman eli millaisen mallin mukaan käyttäjät tehdään
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
