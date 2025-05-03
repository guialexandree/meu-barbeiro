import { StartAttendance } from '@/domain/usecases'
import { RemoteStartAttendance } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteStartAttendance = (): StartAttendance => {
  const apiUrl = process.env.API_URL as string
  return new RemoteStartAttendance(apiUrl, makeAxiosHttpClient())
}
