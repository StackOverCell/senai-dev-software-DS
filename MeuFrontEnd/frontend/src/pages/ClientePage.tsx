import { useState, useEffect } from 'react'
import ClienteForm from '../components/ClienteForm'
import ClienteList from '../components/ClienteList'
import { clienteService } from '../services/ClienteService'
import { type Cliente } from '../types/Cliente'

function ClientePage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null)

  const carregarClientes = async () => {
    try {
      setLoading(true)
      const dados = await clienteService.listar()
      setClientes(dados)
    } catch {
      setErro('Erro ao carregar clientes.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditar = (cliente: Cliente) => {
    setClienteEditando(cliente)
    setErro(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelarEdicao = () => {
    setClienteEditando(null)
  }

  const handleExcluir = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return
    try {
      await clienteService.excluir(id)
      await carregarClientes()
    } catch {
      setErro('Erro ao excluir o cliente.')
    }
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  return (
    <div className="gestao-produtos-container">
      <div className="card">
        <h1 className="titulo">
          <span className="icone"></span>
          Gestão de Clientes
        </h1>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone">📝</span>
            {clienteEditando ? 'Editando Cliente' : 'Cadastrar Cliente'}
          </h3>
          <ClienteForm
            onClienteCriado={carregarClientes}
            clienteEditando={clienteEditando}
            onCancelarEdicao={handleCancelarEdicao}
          />
        </div>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone">📋</span>
            Clientes Cadastrados
          </h3>
          {erro && <p className="erro">{erro}</p>}
          <ClienteList
            clientes={clientes}
            loading={loading}
            onExcluir={handleExcluir}
            onEditar={handleEditar}
          />
        </div>
      </div>
    </div>
  )
}

export default ClientePage