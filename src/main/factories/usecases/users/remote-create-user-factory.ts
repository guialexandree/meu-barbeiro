import { CreateUser } from '@/domain/usecases'
import { RemoteCreateUser } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteCreateUser = (): CreateUser => {
  const apiUrl = process.env.API_URL as string
  return new RemoteCreateUser(apiUrl, makeAxiosHttpClient())
}
