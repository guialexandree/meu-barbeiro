import { LoadAttendancesInfoToday } from '@/domain/usecases'
import { RemoteLoadAttendancesInfoToday } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadAttendancesInfoToday = (): LoadAttendancesInfoToday => {
  const apiUrl = process.env.API_URL as string
  return new RemoteLoadAttendancesInfoToday(apiUrl, makeAxiosHttpClient())
}
