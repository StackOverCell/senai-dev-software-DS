import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5255'
})

// ✅ Interceptor: adiciona o token em toda requisição
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem('auth')
  if (saved) {
    const { token } = JSON.parse(saved)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ✅ Se der 401 (token inválido/expirado), desloga
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api