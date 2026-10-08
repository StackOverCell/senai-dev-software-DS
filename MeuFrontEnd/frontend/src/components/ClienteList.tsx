import { type Cliente } from '../types/Cliente'

interface Props {
  clientes: Cliente[]
  loading: boolean
  onExcluir: (id: number) => void
  onEditar: (cliente: Cliente) => void
}

const formatarCpf = (cpf: string) =>
  cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

function ClienteList({ clientes, loading, onExcluir, onEditar }: Props) {
  if (loading) return <p className="carregando">Carregando...</p>

  if (!Array.isArray(clientes) || clientes.length === 0) {
    return <p className="sem-produtos">Nenhum cliente cadastrado ainda.</p>
  }

  return (
    <div className="tabela-produtos tabela-clientes">
      <div className="tabela-cabecalho">
        <span>Nome</span>
        <span>E-mail</span>
        <span>CPF</span>
        <span>Ações</span>
      </div>

      <ul className="lista-produtos">
        {clientes.map(c => (
          <li key={c.id} className="item-produto">
            <span className="nome-produto">{c.nome}</span>
            <span className="email-cliente">{c.email}</span>
            <span className="cpf-cliente">{formatarCpf(c.cpf)}</span>
            <div className="acoes-produto">
              <button className="btn-editar" onClick={() => onEditar(c)}>
                ✏️ Editar
              </button>
              <button className="btn-excluir" onClick={() => onExcluir(c.id)}>
                🗑️ Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClienteList