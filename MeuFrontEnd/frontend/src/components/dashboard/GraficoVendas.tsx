import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'
import type { VendasPorDia } from '../../types/Dashboard'
import { formatarMoeda, formatarData } from '../../utils/Formatadores'

interface Props {
  dados: VendasPorDia[]
}

function GraficoVendas({ dados }: Props) {
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
        📈 Faturamento por dia
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--borda-linha)" />
          <XAxis
            dataKey="Data"
            tickFormatter={(v: string) => formatarData(v)}
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
          />
          <YAxis
            tickFormatter={(v: number) => `R$ ${v}`}
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
          />
          <Tooltip
            formatter={(value: any) => formatarMoeda(value)}
            labelFormatter={(label: any) => formatarData(label)}
            contentStyle={{
              background: 'var(--bg-card)',
              border: '1px solid var(--borda)',
              borderRadius: '6px'
            }}
          />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="#1a3d5c"
            strokeWidth={2}
            dot={{ fill: '#c8d400', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoVendas