import api from './api'
import { type Produto, type NovoProduto } from '../types/Produto'

export const produtoService = {
  listar: async (): Promise<Produto[]> => {
    const { data } = await api.get<Produto[]>('/api/produto')
    return data
  },

  criar: async (p: NovoProduto): Promise<Produto> => {
    const { data } = await api.post<Produto>('/api/produto', p)
    return data
  },

  atualizar: async (id: number, p: NovoProduto): Promise<Produto> => {
    const { data } = await api.put<Produto>(`/api/produto/${id}`, p)
    return data
  },

  excluir: async (id: number): Promise<void> => {
    await api.delete(`/api/produto/${id}`)
  }
}