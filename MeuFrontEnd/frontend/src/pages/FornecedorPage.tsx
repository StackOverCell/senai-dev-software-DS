import { useState, useEffect } from 'react'
import FornecedorForm from '../components/FornecedorForm'
import FornecedorList from '../components/FornecedorList'
import { fornecedorService } from '../services/FornecedorService'
import { type Fornecedor } from '../types/Fornecedor'

function FornecedorPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [fornecedorEditando, setFornecedorEditando] = useState<Fornecedor | null>(null)

  const carregarFornecedores = async () => {
    try {
      setLoading(true)
      const dados = await fornecedorService.listar()
      setFornecedores(dados)
    } catch {
      setErro('Erro ao carregar fornecedores.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditar = (fornecedor: Fornecedor) => {
    setFornecedorEditando(fornecedor)
    setErro(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelarEdicao = () => {
    setFornecedorEditando(null)
  }

  const handleExcluir = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este fornecedor?')) return
    try {
      await fornecedorService.excluir(id)
      await carregarFornecedores()
    } catch {
      setErro('Erro ao excluir o fornecedor.')
    }
  }

  useEffect(() => {
    carregarFornecedores()
  }, [])

  return (
    <div className="gestao-produtos-container">
      <div className="card">
        <h1 className="titulo">
          <span className="icone">🏢</span>
          Gestão de Fornecedores
        </h1>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone"></span>
            {fornecedorEditando ? 'Editando Fornecedor' : 'Cadastrar Fornecedor'}
          </h3>
          <FornecedorForm
            onFornecedorCriado={carregarFornecedores}
            fornecedorEditando={fornecedorEditando}
            onCancelarEdicao={handleCancelarEdicao}
          />
        </div>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone">📦</span>
            Fornecedores Cadastrados
          </h3>
          {erro && <p className="erro">{erro}</p>}
          <FornecedorList
            fornecedores={fornecedores}
            loading={loading}
            onExcluir={handleExcluir}
            onEditar={handleEditar}
          />
        </div>
      </div>
    </div>
  )
}

export default FornecedorPage