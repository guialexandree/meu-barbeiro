import { CreateAlert } from '@/domain/usecases'
import { RemoteCreateAlert } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteCreateAlert = (): CreateAlert => {
  const apiUrl = process.env.API_URL as string
  return new RemoteCreateAlert(apiUrl, makeAxiosHttpClient())
}
