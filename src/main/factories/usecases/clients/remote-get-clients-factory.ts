import { GetClients } from '@/domain/usecases'
import { RemoteGetClients } from '@/data/usecases'

export const makeRemoteGetClients = (): GetClients => {
  return new RemoteGetClients()
}
