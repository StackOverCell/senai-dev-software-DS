import { useState, type FormEvent } from 'react'
import { produtoService } from '../services/ProdutoService'
import { type Produto } from '../types/Produto'

interface Props {
  onProdutoCriado: () => void
  produtoEditando: Produto | null
  onCancelarEdicao: () => void
}

function ProdutoForm({ onProdutoCriado, produtoEditando, onCancelarEdicao }: Props) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  // Quando o produtoEditando mudar, preenche o formulário
  useState(() => {
    if (produtoEditando) {
      setNome(produtoEditando.nome)
      setPreco(String(produtoEditando.preco))
      setEstoque(String(produtoEditando.estoque))
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro(null)

    if (!nome.trim() || !preco) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }

    const dados = {
      nome: nome.trim(),
      preco: Number(preco.replace(',', '.')),
      estoque: estoque === '' ? 0 : Number(estoque),
      ativo: true
    }

    try {
      setLoading(true)

      if (produtoEditando) {
        // Modo edição
        await produtoService.atualizar(produtoEditando.id, dados)
      } else {
        // Modo criação
        await produtoService.criar(dados)
      }

      // Limpa tudo
      setNome('')
      setPreco('')
      setEstoque('')
      onCancelarEdicao()
      onProdutoCriado()
    } catch {
      setErro('Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelar = () => {
    setNome('')
    setPreco('')
    setEstoque('')
    setErro(null)
    onCancelarEdicao()
  }

  return (
    <form onSubmit={handleSubmit} className="form-produto">
      <div className="form-group">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input-nome"
        />
        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          className="input-estoque"
        />
        <input
          type="text"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="input-preco"
        />

        {produtoEditando ? (
          <>
            <button type="submit" disabled={loading} className="btn-atualizar">
              {loading ? 'Salvando...' : '💾 Atualizar'}
            </button>
            <button type="button" onClick={handleCancelar} className="btn-cancelar">
              ✖ Cancelar
            </button>
          </>
        ) : (
          <button type="submit" disabled={loading} className="btn-cadastrar">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        )}
      </div>
      {erro && <p className="erro">{erro}</p>}
    </form>
  )
}

export default ProdutoForm