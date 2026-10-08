// sisältää blogilistan yksikkötestaukseen tarkoitettuja apufunktioita
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  console.log('Blogeja on yhteensä:', blogs.length)
}

module.exports = {
  dummy,
  totalLikes
}
