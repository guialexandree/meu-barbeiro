import { CreateAlert } from '@/domain/usecases'
import { RemoteCreateAlert } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteCreateAlert = (): CreateAlert => {
  const apiUrl = process.env.API_URL || 'http://localhost:3000'
  return new RemoteCreateAlert(apiUrl, makeAxiosHttpClient())
}
