import { useState, useEffect, type FormEvent } from 'react'
import { fornecedorService } from '../services/FornecedorService'
import { type Fornecedor } from '../types/Fornecedor'

interface Props {
  onFornecedorCriado: () => void
  fornecedorEditando: Fornecedor | null
  onCancelarEdicao: () => void
}

function FornecedorForm({ onFornecedorCriado, fornecedorEditando, onCancelarEdicao }: Props) {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (fornecedorEditando) {
      setNome(fornecedorEditando.Nome)
      setCnpj(fornecedorEditando.Cnpj)
      setEmail(fornecedorEditando.Email)
      setTelefone(fornecedorEditando.Telefone)
    } else {
      setNome('')
      setCnpj('')
      setEmail('')
      setTelefone('')
    }
  }, [fornecedorEditando])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro(null)

    if (!nome.trim() || !cnpj.trim()) {
      setErro('Preencha pelo menos Nome e CNPJ.')
      return
    }

    const dados = {
      Nome: nome.trim(),
      Cnpj: cnpj.trim(),
      Email: email.trim(),
      Telefone: telefone.trim(),
      Ativo: true 
    }

    try {
      setLoading(true)

      if (fornecedorEditando) {
        await fornecedorService.atualizar(fornecedorEditando.Id, dados)
      } else {
        await fornecedorService.criar(dados)
      }

      setNome('')
      setCnpj('')
      setEmail('')
      setTelefone('')
      onCancelarEdicao()
      onFornecedorCriado()
    } catch {
      setErro('Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelar = () => {
    setNome('')
    setCnpj('')
    setEmail('')
    setTelefone('')
    setErro(null)
    onCancelarEdicao()
  }

  return (
    <form onSubmit={handleSubmit} className="form-produto">
      <div className="form-group">
        <input className="input-nome" type="text" placeholder="Nome do Fornecedor"
          value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input className="input-cpf" type="text" placeholder="CNPJ"
          value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
        <input className="input-email" type="email" placeholder="E-mail"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input-estoque" type="text" placeholder="Telefone"
          value={telefone} onChange={(e) => setTelefone(e.target.value)} />

        {fornecedorEditando ? (
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

export default FornecedorForm