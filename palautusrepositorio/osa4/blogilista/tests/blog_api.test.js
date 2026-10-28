// sisältää testejä sovelluksen API-reitteihin, integraatiotestausta
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

// Tarvitaan oma muuttuja palvelimelle että yhteys ja supertest toimii 
const server = app.listen(0, '127.0.0.1')

// supertestin muuttujaan api käärimä express-sovellus tiedostosta app.js
const api = supertest(server)

const initialBlogs = [
  {
    "title": "API-endpoint test training",
    "author": "Taru Testi",
    "url": "taru.netti",
    "likes": 7,
    "id": "6ac3d4ae72dda8e0304d8c17"
  },
  {
    "title": "Testit kuntoon!",
    "author": "Tero Testi",
    "url": "tero.netti",
    "likes": 1,
    "id": "6ac75bd371b8e9b18b1ca827"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs identifier is in form: id', async () => {
  const response = await api.get('/api/blogs')
  assert.ok(response.body.every(blog => blog.id !== undefined))
  assert.ok(response.body.every(blog => blog._id === undefined))
})

test('new blog with required properties and values added', async () => {
  const newBlog = {
    "title": "kaikki messiin",
    "author": "Esa",
    "url": "Esa.net",
    "likes": 85000,
    "id": "123"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('if property likes is missing, set zero there', async () => {
  const newBlog = {
    "title": "likes-kenttä puuttuu/puuttui",
    "author": "Pekka",
    "url": "Pekka.net",
    "id": "456"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('if property title is missing, response with 400 Bad Request', async () => {
  const newBlog = {
    "author": "TitleMissing",
    "url": "titlemissing.net",
    "likes": 1000,
    "id": "789"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('if property url is missing, response with 400 Bad Request', async () => {
  const newBlog = {
    "title": "kenttä url puuttuu",
    "author": "SuperTest",
    "likes": 12,
    "id": "1011"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

// lopuksi suljetaan tietokantayhteys ja palvelin
after(async () => {
  await mongoose.connection.close()

  await new Promise((resolve, reject) => {
    server.close(error => {
      if (error) reject(error)
      else resolve()
    })
  })
})
