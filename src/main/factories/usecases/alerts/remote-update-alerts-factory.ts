import { UpdateAlert } from '@/domain/usecases'
import { RemoteUpdateAlert } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteUpdateAlert = (): UpdateAlert => {
  const apiUrl = process.env.API_URL as string
  return new RemoteUpdateAlert(apiUrl, makeAxiosHttpClient())
}
