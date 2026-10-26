// sisältää blogilistan yksikkötestaukseen tarkoitettuja (apu)funktioita
const blog = require("../models/blog")

// saa parametriksi taulukollisen blogeja ja palauttaa aina 1
const dummy = (blogs) => {
  return 1
}

// saa taulukollisen blogeja joista se palauttaa kentän likes summan
const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const reducer = (sum, item) => {
    return sum + item
  }

  return likes.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

// saa taulukollisen blogeja, joista palauttaa eniten tykätyn
const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const mostLikes = Math.max(...likes)

  const wholeBlog = blogs.find((blog) => blog.likes === mostLikes)

  return wholeBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
