import { _mockClients } from '@/domain/tests'
import { GetClients, GetClientsResult } from '@/domain/usecases'

export class RemoteGetClients implements GetClients {
  constructor() {}

  async get(): Promise<GetClientsResult> {
    console.log('RemoteGetClients.get()')
    return _mockClients
  }
}
