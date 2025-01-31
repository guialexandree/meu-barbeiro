import { _mockClients } from '@/domain/tests'
import { GetClients, GetClientsResult } from '@/domain/usecases'

export class RemoteGetClients implements GetClients {
  constructor() {}

  async get(): Promise<GetClientsResult> {
   return new Promise<GetClientsResult>((resolve) => {
      setTimeout(() => resolve(_mockClients), 1500)
    })
  }
}
