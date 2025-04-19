import { HttpDefaultResponse } from '@/data/protocols'
import { UserModel } from '@/domain/models'

export interface LoadUserById {
  load: (params: LoadUserByIdParams) => Promise<LoadUserByIdResult>
}

export type LoadUserByIdResult = HttpDefaultResponse<UserModel>

export interface LoadUserByIdParams {
  id: string
}
