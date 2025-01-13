import { GetServices } from '@/domain/usecases'
import { RemoteGetServices } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteGetServices = (): GetServices => {
  const apiUrl = process.env.API_URL || 'http://localhost:3000'
  return new RemoteGetServices(apiUrl, makeAxiosHttpClient())
}
