// kirjautuminen tapahtuu POST‑pyynnöllä palvelimen osoitteeseen api/login
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log('lähetä nämä palvelimelle', credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log('palvelimen vastaus', response.data)
  return response.data
}

export default { login }
