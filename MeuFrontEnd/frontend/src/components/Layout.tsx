import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Layout() {
  const [tema, setTema] = useState<'light' | 'dark'>(() => {
    const salvo = localStorage.getItem('tema')
    return (salvo as 'light' | 'dark') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  const alternarTema = () => {
    setTema(t => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="sidebar-titulo">Controle de Estoque</h1>
        <nav className="sidebar-nav">
          <NavLink to="/produtos" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
            📦 Produtos
          </NavLink>
          <NavLink to="/clientes" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
            👥 Clientes
          </NavLink>
        </nav>

        <div className="theme-toggle">
          <button className="btn-theme" onClick={alternarTema}>
            {tema === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
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