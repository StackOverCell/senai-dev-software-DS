export interface Produto {
  Id: number
  Nome: string
  Preco: number
  Estoque: number
  Foto?: string
  Ativo: boolean
}

export type NovoProduto = Omit<Produto, 'Id'>