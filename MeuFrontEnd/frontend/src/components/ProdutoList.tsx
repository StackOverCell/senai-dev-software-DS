import { type Produto } from '../types/Produto'

interface Props {
  produtos: Produto[]
  loading: boolean
  onExcluir: (id: number) => void
  onEditar: (produto: Produto) => void
}

function ProdutoList({ produtos, loading, onExcluir, onEditar }: Props) {
  if (loading) {
    return <p className="carregando">Carregando...</p>
  }

  if (!Array.isArray(produtos) || produtos.length === 0) {
    return <p className="sem-produtos">Nenhum produto cadastrado ainda.</p>
  }

  return (
    <div className="tabela-produtos">
      <div className="tabela-cabecalho">
        <span>Nome</span>
        <span>Estoque</span>
        <span>Preço</span>
        <span>Ações</span>
      </div>

      <ul className="lista-produtos">
        {produtos.map(p => (
          <li key={p.id} className="item-produto">
            <span className="nome-produto">{p.nome}</span>
            <span className={`estoque-produto ${p.estoque === 0 ? 'estoque-zero' : ''}`}>
              {p.estoque}
            </span>
            <span className="preco-produto">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(p.preco)}
            </span>
            <div className="acoes-produto">
          <button className="btn-editar" onClick={() => onEditar(p)}>
          ✏️ Editar
            </button>
              <button className="btn-excluir" onClick={() => onExcluir(p.id)}>
            🗑️ Excluir
          </button>
          </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProdutoList