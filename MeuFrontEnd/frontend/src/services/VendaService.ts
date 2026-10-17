import api from './api'
import { type Venda, type NovaVenda } from '../types/Vendas'

export const vendaService = {
  listar: async (): Promise<Venda[]> => {
    const { data } = await api.get<Venda[]>('/api/venda')
    return data
  },

  criar: async (venda: NovaVenda): Promise<Venda> => {
    const { data } = await api.post<Venda>('/api/venda', venda)
    return data
  }
}