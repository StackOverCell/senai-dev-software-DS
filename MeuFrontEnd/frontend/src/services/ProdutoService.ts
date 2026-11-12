import api from './api'
import type { Produto } from '../types/Produto'

export const produtoService = {
  // ✅ Métodos em inglês (podem ser arrow functions)
  getAll: async (): Promise<Produto[]> => {
    const { data } = await api.get<Produto[]>('/api/produto')
    return data
  },

  getById: async (id: number): Promise<Produto> => {
    const { data } = await api.get<Produto>(`/api/produto/${id}`)
    return data
  },

  create: async (produto: Omit<Produto, 'Id'>): Promise<Produto> => {
    const { data } = await api.post<Produto>('/api/produto', produto)
    return data
  },

  update: async (id: number, produto: Partial<Produto>): Promise<Produto> => {
    const { data } = await api.put<Produto>(`/api/produto/${id}`, produto)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/produto/${id}`)
  },

  uploadFoto: async (id: number, arquivo: File): Promise<string> => {
    const formData = new FormData()
    formData.append('arquivo', arquivo)

    const { data } = await api.post(
      `/api/produto/${id}/foto`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return data.foto
  },

  removerFoto: async (id: number): Promise<void> => {
    await api.delete(`/api/produto/${id}/foto`)
  },

  listar() {
    return this.getAll()
  },
  
  criar(produto: Omit<Produto, 'Id'>) {
    return this.create(produto)
  },
  
  atualizar(id: number, produto: Partial<Produto>) {
    return this.update(id, produto)
  },
  
  excluir(id: number) {
    return this.delete(id)
  }
}