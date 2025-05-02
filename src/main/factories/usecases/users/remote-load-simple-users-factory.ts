import { LoadSimpleUsers } from '@/domain/usecases'
import { RemoteLoadSimpleUsers } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadSimpleUsers = (): LoadSimpleUsers => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadSimpleUsers(apiUrl, makeAxiosHttpClient())
}
