import { LoadServiceById } from '@/domain/usecases'
import { RemoteLoadServiceById } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadServiceById = (): LoadServiceById => {
    const apiUrl = process.env.API_URL as string
    return new RemoteLoadServiceById(apiUrl, makeAxiosHttpClient())
}
