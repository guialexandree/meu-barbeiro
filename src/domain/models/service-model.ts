export type ServiceModel = {
  id: string
  name: string
  description: string
  status: ServiceStatus
  price: number
  timeExecution: number
}

export type ServiceStatus = 'deactivated' | 'actived' | 'todos'
