import { LoadUsers } from '@/domain/usecases'
import { RemoteLoadUsers } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadUsers = (): LoadUsers => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadUsers(apiUrl, makeAxiosHttpClient())
}
