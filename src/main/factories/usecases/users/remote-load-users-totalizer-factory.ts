import { LoadUsersTotalizer } from '@/domain/usecases'
import { RemoteLoadUsersTotalizer } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadUsersTotalizer = (): LoadUsersTotalizer => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadUsersTotalizer(apiUrl, makeAxiosHttpClient())
}
