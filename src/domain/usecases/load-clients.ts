import { HttpDefaultResponse } from '@/data/protocols'
import { ClientResult } from '@/domain/models'

export interface LoadClients {
  load: () => Promise<LoadClientsResult>
}

export type LoadClientsResult =  HttpDefaultResponse<ClientResult[]>
