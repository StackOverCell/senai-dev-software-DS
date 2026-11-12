import { useState, useEffect } from 'react'
import ProdutoForm from '../components/ProdutoForm'
import ProdutoList from '../components/ProdutoList'
import { produtoService } from '../services/ProdutoService'
import { type Produto } from '../types/Produto'

function ProdutoPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null)

  const carregarProdutos = async () => {
    try {
      setLoading(true)
      const dados = await produtoService.listar()
      setProdutos(dados)
    } catch {
      setErro('Erro ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto)
    setErro(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelarEdicao = () => {
    setProdutoEditando(null)
  }

  // ✅ NOVO: Função para atualizar a foto no estado local sem recarregar tudo
  const handleFotoAtualizada = (id: number, novaFoto: string | null) => {
    if (produtoEditando && produtoEditando.Id === id) {
      setProdutoEditando({ ...produtoEditando, Foto: novaFoto || undefined })
    }
    // Opcional: recarrega a lista para garantir que está tudo sincronizado
    carregarProdutos()
  }

  const handleExcluir = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return
    try {
      await produtoService.excluir(id)
      await carregarProdutos()
      // Se o produto excluído era o que estava sendo editado, cancela a edição
      if (produtoEditando?.Id === id) {
        setProdutoEditando(null)
      }
    } catch {
      setErro('Erro ao excluir o produto.')
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  return (
    <div className="gestao-produtos-container">
      <div className="card">
        <h1 className="titulo">
          <span className="icone">⚙️</span>
          Gestão de Produtos
        </h1>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone"></span>
            {produtoEditando ? 'Editando Produto' : 'Cadastrar Produto'}
          </h3>
          
          {/* ✅ NOVO: Passamos a função onFotoAtualizada para o Form */}
          <ProdutoForm
            onProdutoCriado={carregarProdutos}
            produtoEditando={produtoEditando}
            onCancelarEdicao={handleCancelarEdicao}
            onFotoAtualizada={handleFotoAtualizada}
          />
        </div>

        <div className="secao">
          <h3 className="subtitulo">
            <span className="icone">📦</span>
            Produtos Cadastrados
          </h3>
          {erro && <p className="erro">{erro}</p>}
          <ProdutoList
            produtos={produtos}
            loading={loading}
            onExcluir={handleExcluir}
            onEditar={handleEditar}
          />
        </div>
      </div>
    </div>
  )
}

export default ProdutoPage