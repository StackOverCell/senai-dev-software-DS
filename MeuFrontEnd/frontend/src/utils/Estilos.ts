import type { CSSProperties } from 'react'

// Estilo de "cartão branco" reutilizado em todos os blocos
export const cardStyle: CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--borda)',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: 'var(--sombra-card)'
}

export const tituloCardStyle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  marginBottom: '8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px'
}

export const valorCardStyle: CSSProperties = {
  fontSize: '28px',
  fontWeight: 700,
  color: 'var(--text-principal)'
}