export type AlertModel = {
  id: string
  message: string
  type: AlertType
  status: AlertStatus
}

export type AlertType = 'home' | 'services' | 'history'
export type AlertStatus = 'ativo' | 'inativo'