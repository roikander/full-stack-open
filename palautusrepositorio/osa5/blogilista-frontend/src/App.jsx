import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // effect hook, joka hakee kaikki blogit vain ekalla renderöinnillä koska [] 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // pitää käyttäjän kirjautuneena jos sivun päivittää
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      // jos kirjautumistiedot ovat ok, tallenna käyttäjä local storageen
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      // jos kirjautumistiedot ovat ok, aseta token linkittymään käyttäjään     
      blogService.setToken(user.token)
      // ja tallenna kyseinen tunnistettu käyttäjä sovelluksen tilaan 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  // tämän avulla käyttäjä kirjautuu ulos ja selain unohtaa hänet
  const handleLogout = async event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }
  
  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input type='text' value={newTitle} onChange={handleTitleChange} />
        </label>
      </div>
      <div>
        <label>
          author:
          <input type='text' value={newAuthor} onChange={handleAuthorChange} />
        </label>
      </div>
      <div>
        <label>
          url:
          <input type='text' value={newUrl} onChange={handleUrlChange} />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  // renderöi nämä, jos käyttäjä ei ole kirjautuneena
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  // renderöi nämä, jos käyttäjä on kirjautuneena
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <h2>create new</h2>
      <div>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
