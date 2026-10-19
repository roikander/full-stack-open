// sisältää blogilistan yksikkötestaukseen tarkoitettuja (apu)funktioita
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const reducer = (sum, item) => {
    return sum + item
  }

  return likes.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

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
