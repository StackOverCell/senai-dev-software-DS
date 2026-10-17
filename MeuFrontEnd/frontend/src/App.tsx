import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProdutoPage from './pages/ProdutoPage'
import ClientePage from './pages/ClientePage'
import VendasPage from './pages/VendaPage'
import FornecedorPage from './pages/FornecedorPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/produtos" element={<ProdutoPage />} />
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/vendas" element={<VendasPage />} />
        <Route path="/fornecedores" element={<FornecedorPage />} />
        <Route path="*" element={<Navigate to="/produtos" />} />
      </Route>
    </Routes>
  )
}

export default App