export interface DashboardResumo {
  TotalVendas: number
  Faturamento: number
  TicketMedio: number
  TotalClientes: number
}

export interface VendasPorDia {
  Data: string
  Quantidade: number
  Total: number
}

export interface TopProduto {
  ProdutoId: number
  Nome: string
  QuantidadeVendida: number
  Faturamento: number
}

export interface UltimaVenda {
  Id: number
  Cliente: string
  Produto: string
  Quantidade: number
  ValorTotal: number
  DataVenda: string
}

export interface ProdutoEstoqueBaixo {
  Id: number
  Nome: string
  Estoque: number
}