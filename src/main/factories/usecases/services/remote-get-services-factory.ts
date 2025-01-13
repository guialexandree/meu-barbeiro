import { GetServices } from '@/domain/usecases'
import { RemoteGetServices } from '@/data/usecases'

export const makeRemoteGetServices = (): GetServices => {
  return new RemoteGetServices()
}
