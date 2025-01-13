export type ServiceModel = {
  id: number
  name: string
  description: string
  status: 'ativo' | 'inativo'
  price: number
  timeExecution: number
}
