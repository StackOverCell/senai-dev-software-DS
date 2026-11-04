import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/AuthService'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // ✅ MUDANÇA 1: Se já estiver logado, manda para a Dashboard
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  // Limpa o erro após 3 segundos
  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        setErro(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [erro])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)

    try {
      setLoading(true)
      const resp = await authService.login({ email, senha })
      login(resp)
      
      // ✅ MUDANÇA 2: Após logar com sucesso, manda para a Dashboard
      navigate('/dashboard')
      
    } catch {
      setErro('E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🔐</span>
          <h1>Controle de Estoque</h1>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? '⏳ Entrando...' : '🚀 Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>👤 <strong>admin@senai.com</strong></p>
          <p>🔑 <strong>123456</strong></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage