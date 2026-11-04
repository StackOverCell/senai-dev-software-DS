import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Layout() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  
  const [tema, setTema] = useState<'light' | 'dark'>(() => {
    const salvo = localStorage.getItem('tema')
    return (salvo as 'light' | 'dark') || 'light'
  })

  // 🛡️ GUARDA DE SEGURANÇA: Se não estiver logado, chuta para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  const alternarTema = () => {
    setTema(t => (t === 'light' ? 'dark' : 'light'))
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="sidebar-titulo">Controle de Estoque</h1>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/produtos" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
            📦 Produtos
          </NavLink>
          <NavLink to="/clientes" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
            👥 Clientes
          </NavLink>
          <NavLink to="/vendas" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
            💰 Vendas
          </NavLink>
          <NavLink to="/fornecedores" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
            🏢 Fornecedores
          </NavLink>
        </nav>

        <div className="theme-toggle">
          <button className="btn-theme" onClick={alternarTema}>
            {tema === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Sair
          </button>
        </div>
      </aside>
      <main className="conteudo">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout