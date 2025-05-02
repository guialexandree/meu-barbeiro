import { AddAttendanceInQueue } from '@/domain/usecases'
import { RemoteAddAttendanceInQueue } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteAddAttendanceInQueue = (): AddAttendanceInQueue => {
  const apiUrl = process.env.API_URL as string
  return new RemoteAddAttendanceInQueue(apiUrl, makeAxiosHttpClient())
}
