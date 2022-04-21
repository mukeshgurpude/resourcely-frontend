import axios from 'axios'

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1'
const api = axios.create({
  baseURL: base_url
})

const prefixes = { u: '/shortener', t: '/text', i: '/image', f: '/file' }

export { base_url, prefixes }
export default api
