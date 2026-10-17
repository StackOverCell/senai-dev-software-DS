import { useState, useEffect, type FormEvent } from 'react'
import { vendaService } from '../services/VendaService'
import { clienteService } from '../services/ClienteService'
import { produtoService } from '../services/ProdutoService'
import { type Cliente } from '../types/Cliente'
import { type Produto } from '../types/Produto'

interface Props {
  onVendaCriada: () => void
}

function VendaForm({ onVendaCriada }: Props) {
  const [clienteId, setClienteId] = useState<number | ''>('')
  const [produtoId, setProdutoId] = useState<number | ''>('')
  const [quantidade, setQuantidade] = useState<number | ''>('')
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carregandoListas, setCarregandoListas] = useState(true)
  const [carregandoVenda, setCarregandoVenda] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregandoListas(true)
        const [listaClientes, listaProdutos] = await Promise.all([
          clienteService.listar(),
          produtoService.listar()
        ])
        setClientes(listaClientes)
        setProdutos(listaProdutos)
      } catch {
        setErro('Erro ao carregar clientes ou produtos.')
      } finally {
        setCarregandoListas(false)
      }
    }

    carregarDados()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro(null)
    setSucesso(null)

    if (!clienteId || !produtoId || !quantidade || quantidade < 1) {
      setErro('Preencha todos os campos corretamente. A quantidade deve ser no mínimo 1.')
      return
    }

    try {
      setCarregandoVenda(true)
      
      const dadosVenda = {
        Id_Cliente: Number(clienteId),
        Id_Produto: Number(produtoId),
        Quantidade: Number(quantidade)
      }
      
      const vendaCriada = await vendaService.criar(dadosVenda)

      const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(vendaCriada.Total_Venda)

      setSucesso(`✅ Venda registrada com sucesso! Valor Total: ${valorFormatado}`)
      
      setClienteId('')
      setProdutoId('')
      setQuantidade('')
      
      onVendaCriada()
    } catch (error: any) {
      const msg = error.response?.data?.erro || 'Erro ao registrar a venda.'
      setErro(msg)
    } finally {
      setCarregandoVenda(false)
    }
  }

  if (carregandoListas) {
    return <p className="carregando">Carregando clientes e produtos...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="form-venda">
      <div className="form-group">
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value ? Number(e.target.value) : '')}
          required
        >
          <option value="">Selecione o Cliente</option>
          {clientes.map(c => (
            <option key={c.Id} value={c.Id}>{c.Nome}</option>
          ))}
        </select>

        <select
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value ? Number(e.target.value) : '')}
          required
        >
          <option value="">Selecione o Produto</option>
          {produtos.map(p => (
            <option key={p.Id} value={p.Id}>{p.Nome}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Qtd"
          min="1"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value === '' ? '' : Number(e.target.value))}
          required
        />

        <button type="submit" disabled={carregandoVenda} className="btn-cadastrar">
          {carregandoVenda ? '⏳ Processando...' : '💰 Registrar Venda'}
        </button>
      </div>

      {erro && <p className="erro">{erro}</p>}
      {sucesso && <p className="sucesso">{sucesso}</p>}
    </form>
  )
}

export default VendaForm