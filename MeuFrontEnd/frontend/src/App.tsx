import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProdutoPage from './pages/ProdutoPage'
import ClientePage from './pages/ClientePage'
import VendasPage from './pages/VendaPage'
import FornecedorPage from './pages/FornecedorPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/produtos" element={<ProdutoPage />} />
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/vendas" element={<VendasPage />} />
          <Route path="/fornecedores" element={<FornecedorPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App