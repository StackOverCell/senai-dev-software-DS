export interface Fornecedor {
  Id: number
  Nome: string
  Cnpj: string
  Email: string
  Telefone: string
  Ativo: boolean
}

export type NovoFornecedor = Omit<Fornecedor, 'Id'>