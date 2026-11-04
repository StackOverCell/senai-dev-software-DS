import { useEffect, useState } from 'react'
import { dashboardService } from '../services/DashboardService'
import type {
  DashboardResumo,
  VendasPorDia,
  TopProduto,
  UltimaVenda,
  ProdutoEstoqueBaixo
} from '../types/Dashboard'
import CardResumo from '../components/dashboard/CardResumo'
import GraficoVendas from '../components/dashboard/GraficoVendas'
import TopProdutos from '../components/dashboard/TopProdutos'
import UltimasVendas from '../components/dashboard/UltimasVendas'
import EstoqueBaixo from '../components/dashboard/EstoqueBaixo'

function DashboardPage() {
  const [dias, setDias] = useState(30)
  const [resumo, setResumo] = useState<DashboardResumo | null>(null)
  const [vendasDia, setVendasDia] = useState<VendasPorDia[]>([])
  const [top, setTop] = useState<TopProduto[]>([])
  const [ultimas, setUltimas] = useState<UltimaVenda[]>([])
  const [estoque, setEstoque] = useState<ProdutoEstoqueBaixo[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true)
        setErro(null)

        // 5 requisições EM PARALELO (Promise.all)
        const [r, v, t, u, e] = await Promise.all([
          dashboardService.resumo(dias),
          dashboardService.vendasPorDia(dias),
          dashboardService.topProdutos(dias, 5),
          dashboardService.ultimasVendas(5),
          dashboardService.estoqueBaixo(5)
        ])

        setResumo(r)
        setVendasDia(v)
        setTop(t)
        setUltimas(u)
        setEstoque(e)
      } catch {
        setErro('Erro ao carregar o dashboard.')
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [dias]) // recarrega quando o período muda

  return (
    <div
      style={{
        opacity: loading ? 0.6 : 1,
        transition: 'opacity 0.3s ease',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}
    >
      {/* Cabeçalho com filtro de período */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          flexWrap: 'wrap',
          gap: '15px'
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-principal)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          📊 Dashboard
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secundario)'
            }}
          >
            Período:
          </label>
          <select
            value={dias}
            onChange={(e) => setDias(Number(e.target.value))}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid var(--borda)',
              background: 'var(--bg-card)',
              color: 'var(--text-principal)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <option value={7}>Últimos 7 dias</option>
            <option value={15}>Últimos 15 dias</option>
            <option value={30}>Últimos 30 dias</option>
          </select>
        </div>
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <p
          style={{
            color: 'var(--cor-perigo)',
            background: 'rgba(231, 76, 60, 0.1)',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontWeight: 500
          }}
        >
          {erro}
        </p>
      )}

      {/* Cards de resumo (KPIs) */}
      {resumo && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '25px'
          }}
        >
          <CardResumo
            titulo="Faturamento"
            valor={resumo.Faturamento}
            icone="💰"
            destaque={true}
          />
          <CardResumo
            titulo="Vendas"
            valor={resumo.TotalVendas}
            icone="🛒"
          />
          <CardResumo
            titulo="Ticket Médio"
            valor={resumo.TicketMedio}
            icone="🎯"
          />
          <CardResumo
            titulo="Clientes"
            valor={resumo.TotalClientes}
            icone="👥"
          />
        </div>
      )}

      {/* Gráfico de faturamento por dia */}
      <div style={{ marginBottom: '25px' }}>
        <GraficoVendas dados={vendasDia} />
      </div>

      {/* Top produtos + Últimas vendas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '25px'
        }}
      >
        <TopProdutos dados={top} />
        <UltimasVendas dados={ultimas} />
      </div>

      {/* Estoque baixo */}
      <div style={{ marginBottom: '25px' }}>
        <EstoqueBaixo dados={estoque} />
      </div>
    </div>
  )
}

export default DashboardPage