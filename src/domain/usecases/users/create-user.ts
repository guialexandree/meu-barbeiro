import { HttpDefaultResponse } from '@/data/protocols'
import { ClientModel, UserRole } from '@/domain/models'

export interface CreateClient {
  create: (params: CreateClientParams) => Promise<CreateClientResult>
}

export type CreateClientParams = {
  password: string
  name: string
  contactNumber: string
  role: UserRole
}
export type CreateClientResult = HttpDefaultResponse<ClientModel>
