import { LoadAttendancesByUser } from '@/domain/usecases'
import { RemoteLoadAttendancesByUser } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadAttendancesByUser = (): LoadAttendancesByUser => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadAttendancesByUser(apiUrl, makeAxiosHttpClient())
}
