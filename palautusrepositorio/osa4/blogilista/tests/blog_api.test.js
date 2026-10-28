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
    "title": "Always separate app and server files !",
    "author": "nermineslimane",
    "url": "https://dev.to/nermine-slimane/always-separate-app-and-server-files--1nc7",
    "likes": 30,
    "id": "6ac3d4ae72dda8e0304d8c1b"
  },
  {
    "title": "Naming files and directories in JavaScript projects",
    "author": "Kevan Stannard",
    "url": "https://dev.to/kevanstannard/naming-files-and-directories-in-javascript-projects-35e4",
    "likes": 11,
    "id": "6ac75bd371b8e9b18b1ca820"
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

test('new blog with required field and values +', async () => {
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

test('new blog without likes-field or its value empty +', async () => {
  const newBlog = {
    "title": "likes-kenttää ei ollenkaan pyynnössä mukana",
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
