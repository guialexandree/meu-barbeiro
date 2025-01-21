export type ServiceModel = {
  id: string
  name: string
  description: string
  status: 'ativo' | 'inativo'
  price: number
  timeExecution: number
}
