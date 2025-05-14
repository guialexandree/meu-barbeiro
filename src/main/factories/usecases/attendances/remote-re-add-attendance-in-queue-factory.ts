import { ReAddAttendanceInQueue } from '@/domain/usecases'
import { RemoteReAddAttendanceInQueue } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteReAddAttendanceInQueue = (): ReAddAttendanceInQueue => {
  const apiUrl = process.env.API_URL as string
  return new RemoteReAddAttendanceInQueue(apiUrl, makeAxiosHttpClient())
}
