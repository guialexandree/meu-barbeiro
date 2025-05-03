import { EndAttendance } from '@/domain/usecases'
import { RemoteEndAttendance } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteEndAttendance = (): EndAttendance => {
  const apiUrl = process.env.API_URL as string
  return new RemoteEndAttendance(apiUrl, makeAxiosHttpClient())
}
