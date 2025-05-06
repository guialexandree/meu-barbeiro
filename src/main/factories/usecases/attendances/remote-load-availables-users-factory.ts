import { LoadAvailablesUsers } from '@/domain/usecases'
import { RemoteLoadAvailablesUsers } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadAvailablesUsers = (): LoadAvailablesUsers => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadAvailablesUsers(apiUrl, makeAxiosHttpClient())
}
