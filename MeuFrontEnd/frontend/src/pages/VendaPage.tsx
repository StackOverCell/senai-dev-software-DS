import { useState } from 'react'
import VendaForm from '../components/VendaForm'
import VendaList from '../components/VendaList'

function VendasPage() {
  // Estado de versão: incrementa a cada venda criada para forçar atualização da lista
  const [refresh, setRefresh] = useState(0)

  const handleVendaCriada = () => {
    setRefresh(prev => prev + 1)
  }

  return (
    <div className="gestao-produtos-container">
      <div className="card">
        <h1 className="titulo">
          <span className="icone">💰</span>
          Registro de Vendas
        </h1>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone">📝</span>
            Nova Venda
          </h3>
          <VendaForm onVendaCriada={handleVendaCriada} />
        </div>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone"></span>
            Histórico de Vendas
          </h3>
          <VendaList refresh={refresh} />
        </div>
      </div>
    </div>
  )
}

export default VendasPage