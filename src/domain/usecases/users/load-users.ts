import { HttpDefaultResponse } from '@/data/protocols'
import { UserResult } from '@/domain/models'

export interface LoadUsers {
  load: (params?: LoadUsersParams) => Promise<LoadUsersResult>
}

export type LoadUsersResult = HttpDefaultResponse<UserResult[]>

export interface LoadUsersParams {
  page?: number
  limit?: number
  search?: string
  sortOrder?: 'asc' | 'desc'
}
