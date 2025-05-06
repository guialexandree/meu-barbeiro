export type UserModel = {
  id: string
  name: string
  status: UserStatus
  contactNumber: string
  role: UserRole
  createdAt: Date
}

export type UserResult = UserModel

export type UserRole = 'admin' | 'barber' | 'client'

export type UserOrigin = 'sms' | 'facebook' | 'instagram' | 'barber'

export type UserStatus = 'actived' | 'bloqued' | 'canceled'

export type SimpleUser = {
  id: string
  name: string
  nickname: string
}
