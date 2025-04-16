import { CreateClient } from '@/domain/usecases'
import { RemoteCreateClient } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteCreateClient = (): CreateClient => {
  const apiUrl = process.env.API_URL as string
  return new RemoteCreateClient(apiUrl, makeAxiosHttpClient())
}
