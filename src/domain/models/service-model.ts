export type ServiceModel = {
  id: string
  name: string
  description: string
  status: ServiceStatus
  price: number
  timeExecution: number
  default?: boolean
}

export type ServiceStatus = 'deactivated' | 'actived' | 'all'
