// välittää axioksen avulla backendin polkuun /api/blogs pyyntöjä
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// asettaa juurikomponentilta saamansa tunnisteen muuttujaan token
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// ja config asettaa muuttujan token Authorization-headerin avaimeksi
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setToken }
