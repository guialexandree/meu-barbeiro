import { LoadUserById } from '@/domain/usecases'
import { RemoteLoadUserById } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadUserById = (): LoadUserById => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadUserById(apiUrl, makeAxiosHttpClient())
}
