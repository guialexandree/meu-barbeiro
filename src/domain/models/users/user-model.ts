export type UserModel = {
  id: string
  name: string
  status: UserStatus
  contactNumber: string
  role: UserRole
  createdAt: Date
}

export type UserResult = Omit<UserModel, 'id'> & {
  id: string
}

export type UserRole = 'admin' | 'barber' | 'client'

export type UserOrigin = 'sms' | 'facebook' | 'instagram' | 'barber'

export type UserStatus = 'actived' | 'bloqued' | 'canceled'
