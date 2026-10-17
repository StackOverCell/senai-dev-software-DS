import { type Fornecedor } from '../types/Fornecedor'

interface Props {
  fornecedores: Fornecedor[]
  loading: boolean
  onExcluir: (id: number) => void
  onEditar: (fornecedor: Fornecedor) => void
}

function FornecedorList({ fornecedores, loading, onExcluir, onEditar }: Props) {
  if (loading) return <p className="carregando">Carregando...</p>

  if (!Array.isArray(fornecedores) || fornecedores.length === 0) {
    return <p className="sem-produtos">Nenhum fornecedor cadastrado ainda.</p>
  }

  return (
    <div className="tabela-produtos tabela-fornecedores">
      <div className="tabela-cabecalho">
        <span>Nome</span>
        <span>CNPJ</span>
        <span>E-mail</span>
        <span>Telefone</span>
        <span>Ações</span>
      </div>

      <ul className="lista-produtos">
        {fornecedores.map(f => (
          <li key={f.Id} className="item-produto">
            <span className="nome-produto">{f.Nome}</span>
            <span className="cpf-cliente">{f.Cnpj}</span>
            <span className="email-cliente">{f.Email || '-'}</span>
            <span className="email-cliente">{f.Telefone || '-'}</span>
            <div className="acoes-produto">
              <button className="btn-editar" onClick={() => onEditar(f)}>
                ✏️ Editar
              </button>
              <button className="btn-excluir" onClick={() => onExcluir(f.Id)}>
                🗑️ Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FornecedorList