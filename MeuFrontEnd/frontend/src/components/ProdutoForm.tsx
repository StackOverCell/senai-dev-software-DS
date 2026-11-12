import { useState, useEffect, type FormEvent } from 'react'
import { produtoService } from '../services/ProdutoService'
import { type Produto } from '../types/Produto'
import FotoUpload from './produtos/FotoUpload' // ✅ NOVO: Import do componente

interface Props {
  onProdutoCriado: () => void
  produtoEditando: Produto | null
  onCancelarEdicao: () => void
  onFotoAtualizada?: (id: number, novaFoto: string | null) => void // ✅ NOVO
}

function ProdutoForm({ 
  onProdutoCriado, 
  produtoEditando, 
  onCancelarEdicao,
  onFotoAtualizada // ✅ NOVO
}: Props) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  
  // ✅ NOVO: Estado local para a foto, sincronizado com o produto editando
  const [fotoAtual, setFotoAtual] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (produtoEditando) {
      setNome(produtoEditando.Nome)
      setPreco(String(produtoEditando.Preco))
      setEstoque(String(produtoEditando.Estoque))
      setFotoAtual(produtoEditando.Foto) // ✅ Sincroniza a foto
    } else {
      setNome('')
      setPreco('')
      setEstoque('')
      setFotoAtual(undefined) // ✅ Limpa a foto ao criar novo
    }
  }, [produtoEditando])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro(null)

    if (!nome.trim() || !preco) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }

    const dados = {
      Nome: nome.trim(),
      Preco: Number(preco.replace(',', '.')),
      Estoque: estoque === '' ? 0 : Number(estoque),
      Ativo: true
    }

    try {
      setLoading(true)

      if (produtoEditando) {
        await produtoService.atualizar(produtoEditando.Id, dados)
      } else {
        await produtoService.criar(dados)
      }

      setNome('')
      setPreco('')
      setEstoque('')
      setFotoAtual(undefined)
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
    setFotoAtual(undefined)
    setErro(null)
    onCancelarEdicao()
  }

  // ✅ NOVO: Função chamada pelo FotoUpload quando a foto muda
  const handleMudancaFoto = (novaFoto: string | null) => {
    setFotoAtual(novaFoto || undefined)
    if (onFotoAtualizada && produtoEditando) {
      onFotoAtualizada(produtoEditando.Id, novaFoto)
    }
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

      {/* ✅ NOVO: Exibe o upload de foto APENAS no modo de edição */}
      {produtoEditando && (
        <FotoUpload
          produtoId={produtoEditando.Id}
          fotoAtual={fotoAtual || null}
          onAtualizar={handleMudancaFoto}
        />
      )}
    </form>
  )
}

export default ProdutoForm