import api from './api'
import { type Cliente, type NovoCliente } from '../types/Cliente'

export const clienteService = {
  listar: async (): Promise<Cliente[]> => {
    const { data } = await api.get<Cliente[]>('/api/cliente')
    return data
  },

  criar: async (c: NovoCliente): Promise<Cliente> => {
    const { data } = await api.post<Cliente>('/api/cliente', c)
    return data
  },

  atualizar: async (id: number, c: NovoCliente): Promise<Cliente> => {
    const { data } = await api.put<Cliente>(`/api/cliente/${id}`, c)
    return data
  },

  excluir: async (id: number): Promise<void> => {
    await api.delete(`/api/cliente/${id}`)
  }
}