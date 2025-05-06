import { CancelAttendance } from '@/domain/usecases'
import { RemoteCancelAttendance } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteCancelAttendance = (): CancelAttendance => {
  const apiUrl = process.env.API_URL as string
  return new RemoteCancelAttendance(apiUrl, makeAxiosHttpClient())
}
