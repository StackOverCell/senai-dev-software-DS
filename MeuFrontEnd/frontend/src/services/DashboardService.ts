import api from './api'
import type {
  DashboardResumo,
  VendasPorDia,
  TopProduto,
  UltimaVenda,
  ProdutoEstoqueBaixo
} from '../types/Dashboard'

export const dashboardService = {
  resumo: async (dias: number): Promise<DashboardResumo> => {
    const { data } = await api.get<DashboardResumo>('/api/dashboard/resumo', {
      params: { dias }
    })
    return data
  },

  vendasPorDia: async (dias: number): Promise<VendasPorDia[]> => {
    const { data } = await api.get<VendasPorDia[]>('/api/dashboard/vendas-por-dia', {
      params: { dias }
    })
    return data
  },

  topProdutos: async (dias: number, limite: number): Promise<TopProduto[]> => {
    const { data } = await api.get<TopProduto[]>('/api/dashboard/top-produtos', {
      params: { dias, limite }
    })
    return data
  },

  ultimasVendas: async (limite: number): Promise<UltimaVenda[]> => {
    const { data } = await api.get<UltimaVenda[]>('/api/dashboard/ultimas-vendas', {
      params: { limite }
    })
    return data
  },

  estoqueBaixo: async (minimo: number): Promise<ProdutoEstoqueBaixo[]> => {
    const { data } = await api.get<ProdutoEstoqueBaixo[]>('/api/dashboard/estoque-baixo', {
      params: { minimo }
    })
    return data
  }
}