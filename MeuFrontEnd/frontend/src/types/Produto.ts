export interface Produto {
  Id: number
  Nome: string
  Preco: number
  Estoque: number
  Ativo: boolean
}
export type NovoProduto = Omit<Produto, 'Id'>