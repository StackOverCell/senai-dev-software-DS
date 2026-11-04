import type { UltimaVenda } from '../../types/Dashboard'
import { formatarMoeda, formatarDataHora } from '../../utils/Formatadores'

interface Props {
  dados: UltimaVenda[]
}

function UltimasVendas({ dados }: Props) {
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
        🧾 Últimas Vendas
      </h3>

      {dados.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
          Nenhuma venda registrada.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid var(--borda)',
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}
              >
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Data</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Cliente</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Produto</th>
                <th style={{ textAlign: 'center', padding: '10px 8px' }}>Qtd</th>
                <th style={{ textAlign: 'right', padding: '10px 8px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((v) => (
                <tr
                  key={v.Id}
                  style={{
                    borderBottom: '1px solid var(--borda-linha)'
                  }}
                >
                  <td style={{ padding: '10px 8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                    {formatarDataHora(v.DataVenda)}
                  </td>
                  <td style={{ padding: '10px 8px', color: 'var(--text-principal)' }}>
                    {v.Cliente}
                  </td>
                  <td style={{ padding: '10px 8px', color: 'var(--text-principal)' }}>
                    {v.Produto}
                  </td>
                  <td
                    style={{
                      padding: '10px 8px',
                      textAlign: 'center',
                      fontWeight: 600,
                      color: 'var(--text-principal)'
                    }}
                  >
                    {v.Quantidade}
                  </td>
                  <td
                    style={{
                      padding: '10px 8px',
                      textAlign: 'right',
                      fontWeight: 700,
                      color: 'var(--cor-sucesso)'
                    }}
                  >
                    {formatarMoeda(v.ValorTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UltimasVendas