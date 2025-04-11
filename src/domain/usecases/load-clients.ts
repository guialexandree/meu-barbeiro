import { HttpDefaultResponse } from '@/data/protocols'
import { ClientResult } from '@/domain/models'

export interface LoadClients {
  load: (params?: LoadClientsParams) => Promise<LoadClientsResult>
}

export type LoadClientsResult = HttpDefaultResponse<ClientResult[]>

export interface LoadClientsParams {
  page?: number
  limit?: number
  search?: string
  sortOrder?: 'asc' | 'desc'
}
