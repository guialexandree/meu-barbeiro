import { LoadDoneAttendances } from '@/domain/usecases'
import { RemoteLoadDoneAttendances } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadDoneAttendances = (): LoadDoneAttendances => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadDoneAttendances(apiUrl, makeAxiosHttpClient())
}
