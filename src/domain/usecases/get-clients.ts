import { ClientResult } from '@/domain/models'

export interface GetClients {
  get: () => Promise<GetClientsResult>
}

export type GetClientsResult = ClientResult[]
