import { RemoveAlert } from '@/domain/usecases'
import { RemoteRemoveAlert } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteRemoveAlert = (): RemoveAlert => {
  const apiUrl = process.env.API_URL as string
  return new RemoteRemoveAlert(apiUrl, makeAxiosHttpClient())
}
