import axios from 'axios'

const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1'
const api = axios.create({
  baseURL: base_url
})

export { base_url }
export default api
