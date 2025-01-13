export type ClientModel = {
  id: string
  name: string
  status: UserStatus
  username: string
  contactNumber: string
  email: string
  createdAt: Date
}

export type ClientResult = Omit<ClientModel, 'id'> & {
  id: number
}

export type UserRole = 'admin' | 'barber' | 'client'

export type UserOrigin = 'sms' | 'facebook' | 'instagram' | 'barber'

export type UserStatus = 'actived' | 'bloqued' | 'canceled'
