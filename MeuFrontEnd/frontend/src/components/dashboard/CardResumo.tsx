import { formatarMoeda } from '../../utils/Formatadores'

interface Props {
  titulo: string
  valor: number
  icone: string
  destaque?: boolean
}

function CardResumo({ titulo, valor, icone, destaque = false }: Props) {
  return (
    <div
      style={{
        background: destaque ? '#1a3d5c' : 'var(--bg-card)',
        color: destaque ? 'white' : 'var(--text-principal)',
        borderLeft: '6px solid #c8d400',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease'
      }}
    >
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: destaque ? '#c8d400' : 'var(--text-muted)',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        {icone} {titulo}
      </div>
      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: destaque ? 'white' : 'var(--text-principal)'
        }}
      >
        {titulo.toLowerCase().includes('faturamento') || 
         titulo.toLowerCase().includes('ticket')
          ? formatarMoeda(valor)
          : valor.toLocaleString('pt-BR')}
      </div>
    </div>
  )
}

export default CardResumo