import { LoadCompany } from '@/domain/usecases'
import { RemoteLoadCompany } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadCompany = (): LoadCompany => {
    const apiUrl = process.env.API_URL as string
    return new RemoteLoadCompany(apiUrl, makeAxiosHttpClient())
}
