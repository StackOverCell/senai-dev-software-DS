export const formatarMoeda = (v: number): string =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatarData = (data: string): string => {
  const d = new Date(data)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const formatarDataHora = (data: string): string => {
  const d = new Date(data)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}