import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5255'  // Porta do seu back-end .NET
})

export default api