import { LoadClients } from '@/domain/usecases'
import { RemoteGetClients } from '@/data/usecases'

export const makeRemoteLoadClients = (): LoadClients => {
  return new RemoteGetClients()
}
