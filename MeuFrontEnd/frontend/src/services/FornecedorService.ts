import api from './api'
import { type Fornecedor, type NovoFornecedor } from '../types/Fornecedor'

export const fornecedorService = {
  listar: async (): Promise<Fornecedor[]> => {
    const { data } = await api.get<Fornecedor[]>('/api/fornecedor')
    return data
  },

  criar: async (f: NovoFornecedor): Promise<Fornecedor> => {
    const { data } = await api.post<Fornecedor>('/api/fornecedor', f)
    return data
  },

  atualizar: async (id: number, f: NovoFornecedor): Promise<Fornecedor> => {
    const { data } = await api.put<Fornecedor>(`/api/fornecedor/${id}`, f)
    return data
  },

  excluir: async (id: number): Promise<void> => {
    await api.delete(`/api/fornecedor/${id}`)
  }
}