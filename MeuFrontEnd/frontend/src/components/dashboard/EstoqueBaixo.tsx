import type { ProdutoEstoqueBaixo } from '../../types/Dashboard'

interface Props {
  dados: ProdutoEstoqueBaixo[]
}

function EstoqueBaixo({ dados }: Props) {
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
        ⚠️ Estoque Baixo
      </h3>

      {dados.length === 0 ? (
        <p
          style={{
            color: 'var(--cor-sucesso)',
            textAlign: 'center',
            padding: '20px',
            fontWeight: 500
          }}
        >
          ✅ Todos os produtos com estoque ok.
        </p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}
        >
          {dados.map((p) => (
            <li
              key={p.Id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 10px',
                borderBottom: '1px solid var(--borda-linha)',
                color: 'var(--text-principal)'
              }}
            >
              <span style={{ fontWeight: 500 }}>{p.Nome}</span>
              <span
                style={{
                  background: 'rgba(231, 76, 60, 0.15)',
                  color: 'var(--cor-perigo)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 700
                }}
              >
                {p.Estoque} un.
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EstoqueBaixo