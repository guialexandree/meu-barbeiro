import { LoadClients } from '@/domain/usecases'
import { RemoteGetClients } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadClients = (): LoadClients => {
  const apiUrl = process.env.API_URL as string
  return new RemoteGetClients(apiUrl, makeAxiosHttpClient())
}
