// sisältää blogilistan yksikkötestaukseen tarkoitettuja apufunktioita
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  //console.log('Blogeja on yhteensä:', blogs.length)
  //console.log('Blogin saamat tykkäykset:', blogs[0].likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs[0].likes
}

module.exports = {
  dummy,
  totalLikes
}
