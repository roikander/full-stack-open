const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

// Tarvitaan oma muuttuja palvelimelle että yhteys toimii ja että
// testejä voi ajaa, kurssin esimerkkisovellus ei tarvinnut.
const server = app.listen(0, '127.0.0.1')

// supertestin muuttujaan api käärimä express-sovellus tiedostosta app.js
const api = supertest(server)

const initialBlogs = [
  {
    "title": "esan blogi",
    "author": "esa",
    "url": "www.esa.net",
    "likes": 0
  },
  {
    "title": "igor's cooking recipes",
    "author": "igor",
    "url": "www.igor.eat",
    "likes": 8500
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// Lopuksi katkaistaan tietokantayhteys ja 
// HTTP-palvelin, jota ei kurssin esimerkissä tarvinnut olla/katkaista
after(async () => {
  await mongoose.connection.close()

  await new Promise((resolve, reject) => {
    server.close(error => {
      if (error) reject(error)
      else resolve()
    })
  })
})
