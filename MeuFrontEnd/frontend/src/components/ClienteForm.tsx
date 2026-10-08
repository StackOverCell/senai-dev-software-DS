import { useState, type FormEvent } from 'react'
import { clienteService } from '../services/ClienteService'
import { type Cliente } from '../types/Cliente'

interface Props {
  onClienteCriado: () => void
  clienteEditando: Cliente | null
  onCancelarEdicao: () => void
}

function ClienteForm({ onClienteCriado, clienteEditando, onCancelarEdicao }: Props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  // Preenche o formulário quando entra em modo edição
  useState(() => {
    if (clienteEditando) {
      setNome(clienteEditando.nome)
      setEmail(clienteEditando.email)
      setCpf(clienteEditando.cpf)
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro(null)

    if (!nome.trim() || !email.trim() || !cpf.trim()) {
      setErro('Preencha todos os campos.')
      return
    }

    const dados = {
      nome: nome.trim(),
      email: email.trim(),
      cpf: cpf.trim()
    }

    try {
      setLoading(true)

      if (clienteEditando) {
        await clienteService.atualizar(clienteEditando.id, dados)
      } else {
        await clienteService.criar(dados)
      }

      setNome('')
      setEmail('')
      setCpf('')
      onCancelarEdicao()
      onClienteCriado()
    } catch {
      setErro('Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelar = () => {
    setNome('')
    setEmail('')
    setCpf('')
    setErro(null)
    onCancelarEdicao()
  }

  return (
    <form onSubmit={handleSubmit} className="form-produto">
      <div className="form-group">
        <input className="input-nome" type="text" placeholder="Nome do cliente"
          value={nome} onChange={(e) => setNome(e.target.value)} />
        <input className="input-email" type="email" placeholder="E-mail"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input-cpf" type="text" placeholder="CPF" maxLength={11}
          value={cpf} onChange={(e) => setCpf(e.target.value)} />

        {clienteEditando ? (
          <>
            <button className="btn-atualizar" type="submit" disabled={loading}>
              {loading ? 'Salvando...' : '💾 Atualizar'}
            </button>
            <button className="btn-cancelar" type="button" onClick={handleCancelar}>
              ✖ Cancelar
            </button>
          </>
        ) : (
          <button className="btn-cadastrar" type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        )}
      </div>
      {erro && <p className="erro">{erro}</p>}
    </form>
  )
}

export default ClienteForm