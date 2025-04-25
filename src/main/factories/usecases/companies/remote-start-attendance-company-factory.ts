import { StartAttendanceCompany } from '@/domain/usecases'
import { RemoteStartAttendanceCompany } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteStartAttendanceCompany = (): StartAttendanceCompany => {
    const apiUrl = process.env.API_URL as string
    return new RemoteStartAttendanceCompany(apiUrl, makeAxiosHttpClient())
}
