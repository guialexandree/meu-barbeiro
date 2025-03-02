import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const makeRemoteAuthentication = (): Authentication => {
  const apiUrl = process.env.API_URL as string
  return new RemoteAuthentication(apiUrl, makeAxiosHttpClient(), makeLocalStorageAdapter())
}
