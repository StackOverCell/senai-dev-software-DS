import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProdutoPage from './pages/ProdutoPage'
import ClientePage from './pages/ClientePage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/produtos" element={<ProdutoPage />} />
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="*" element={<Navigate to="/produtos" />} />
      </Route>
    </Routes>
  )
}

export default App