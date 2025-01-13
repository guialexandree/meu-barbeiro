import { _mockServices } from '@/domain/tests'
import { GetServices, GetServicesResult } from '@/domain/usecases'

export class RemoteGetServices implements GetServices {
  constructor() {}

  async get(): Promise<GetServicesResult> {
    return _mockServices
  }
}
