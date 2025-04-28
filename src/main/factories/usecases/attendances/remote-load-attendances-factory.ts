import { LoadAttendances } from '@/domain/usecases'
import { RemoteLoadAttendances } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadAttendances = (): LoadAttendances => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadAttendances(apiUrl, makeAxiosHttpClient())
}
