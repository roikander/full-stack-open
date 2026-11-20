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

const create = async newObject => {
  // config luo headerin jonka avaimena on ylempänä luotu token eli tunniste
  const config = {
    headers: { Authorization: token }
  }
  // lähettää peruspolkuunsa uuden blogi-olion ja valtuutustiedot 
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setToken }
