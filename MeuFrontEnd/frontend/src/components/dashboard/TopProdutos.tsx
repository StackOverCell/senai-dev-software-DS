import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'
import type { TopProduto } from '../../types/Dashboard'
import { formatarMoeda } from '../../utils/Formatadores'

interface Props {
  dados: TopProduto[]
}

function TopProdutos({ dados }: Props) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--borda)',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: 'var(--sombra-card)'
      }}
    >
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-principal)',
          marginBottom: '15px'
        }}
      >
        🏆 Top Produtos
      </h3>

      {dados.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
          Sem vendas no período.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={dados} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--borda-linha)" />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            />
            <YAxis
              type="category"
              dataKey="Nome"
              width={100}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            />
            <Tooltip
              formatter={(value: any) => formatarMoeda(value)}
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--borda)',
                borderRadius: '6px'
              }}
            />
            <Bar
              dataKey="Faturamento"
              fill="#1a3d5c"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default TopProdutos