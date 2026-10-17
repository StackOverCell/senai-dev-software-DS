export interface Venda {
  id: number
  NomeCliente: string
  NomeProduto: string
  Quantidade: number
  Data_Venda: string
  Valor_Unitario: number
  Total_Venda: number
}

export interface NovaVenda {
  Id_Cliente: number
  Id_Produto: number
  Quantidade: number
}