export interface Cliente {
  Id: number
  Nome: string
  Email: string
  Cpf: string
  Ativo: boolean
}

export type NovoCliente = Omit<Cliente, 'Id'>