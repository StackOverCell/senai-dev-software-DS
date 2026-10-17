import { useState, useEffect } from 'react'
import { vendaService } from '../services/VendaService'
import { type Venda } from '../types/Vendas'

interface Props {
  refresh: number
}

function VendaList({ refresh }: Props) {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true)
        const listaVendas = await vendaService.listar()
        setVendas(listaVendas)
      } catch {
        console.error('Erro ao carregar vendas.')
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [refresh])

  const formatarData = (data: string): string => {
    if (!data) return 'Data não disponível'
    
    const dateObj = new Date(data)
    if (isNaN(dateObj.getTime())) return 'Data inválida'
    
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  if (loading) {
    return <p className="carregando">Carregando histórico de vendas...</p>
  }

  if (vendas.length === 0) {
    return <p className="sem-produtos">Nenhuma venda registrada ainda.</p>
  }

  return (
    <div className="tabela-vendas">
      <div className="tabela-cabecalho">
        <span>Data</span>
        <span>Cliente</span>
        <span>Produto</span>
        <span>Qtd</span>
        <span>Valor Total</span>
      </div>

      <ul className="lista-produtos">
        {vendas.map(v => (
          <li key={v.id} className="item-produto">
            {/* ✅ AQUI ESTÁ A CORREÇÃO: Usando os nomes com maiúscula */}
            <span className="data-venda">{formatarData(v.Data_Venda)}</span>
            <span className="nome-produto">{v.NomeCliente}</span>
            <span className="nome-produto">{v.NomeProduto}</span>
            <span className="qtd-venda">{v.Quantidade}</span>
            <span className="preco-produto">{formatarValor(v.Total_Venda)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VendaList