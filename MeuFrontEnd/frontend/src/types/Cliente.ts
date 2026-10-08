export interface Cliente {
  id: number
  nome: string
  email: string
  cpf: string
}

export type NovoCliente = Omit<Cliente, 'id'>