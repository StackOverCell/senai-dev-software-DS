import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5255' // Confirme se esta é a porta do seu backend
})

// ✅ INTERCEPTOR DE REQUISIÇÃO
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem('auth')
  if (saved) {
    const user = JSON.parse(saved)
    
    // ✅ ATENÇÃO AQUI: 'Token' com T maiúsculo, igual ao seu C#!
    if (user.Token) {
      config.headers.Authorization = `Bearer ${user.Token}`
    }
  }
  return config
})

// ✅ INTERCEPTOR DE RESPOSTA (Se der 401, desloga)
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