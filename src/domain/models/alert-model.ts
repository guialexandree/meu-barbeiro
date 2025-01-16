export type AlertModel = {
  id: string
  message: string
  type: AlertType
  status: AlertStatus
}

export type AlertType = 'home' | 'services' | 'history' | 'prices'
export type AlertStatus = 'ativo' | 'inativo'