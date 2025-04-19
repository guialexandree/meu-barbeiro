import { UserModel, UserRole } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface CreateUser {
  create: (params: CreateUserParams) => Promise<CreateUserResult>
}

export type CreateUserParams = {
  password: string
  name: string
  contactNumber: string
  role: UserRole
}
export type CreateUserResult = HttpDefaultResponse<UserModel>
