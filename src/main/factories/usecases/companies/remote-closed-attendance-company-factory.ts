import { ClosedAttendanceCompany } from '@/domain/usecases'
import { RemoteClosedAttendanceCompany } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteClosedAttendanceCompany = (): ClosedAttendanceCompany => {
    const apiUrl = process.env.API_URL as string
    return new RemoteClosedAttendanceCompany(apiUrl, makeAxiosHttpClient())
}
