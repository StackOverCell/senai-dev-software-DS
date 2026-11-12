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
export const getFotoUrl = (foto?: string): string => {
  if (!foto) return ''
  
  // Pega a URL base da API das variáveis de ambiente ou usa o padrão
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5255'
  
  // Remove '/api' se existir no final da URL base
  const baseUrl = apiUrl.replace(/\/api$/, '')
  
  // Retorna a URL completa da imagem
  return `${baseUrl}/uploads/produtos/${foto}`
}