import { NavLink } from 'react-router-dom'

interface Props {
  tema: 'light' | 'dark'
  alternarTema: () => void
}

function Sidebar({ tema, alternarTema }: Props) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-titulo">Controle de Estoque</h1>
      <nav className="sidebar-nav">
        <NavLink to="/produtos" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
          📦 Produtos
        </NavLink>
        <NavLink to="/clientes" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
          👥 Clientes
        </NavLink>
        <NavLink to="/vendas" className={({ isActive }) => `nav-link ${isActive ? 'ativa' : ''}`}>
          💰 Vendas
        </NavLink>
      </nav>

      <div className="theme-toggle">
        <button className="btn-theme" onClick={alternarTema}>
          {tema === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar