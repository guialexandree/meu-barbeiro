import { LoadServices } from '@/domain/usecases'
import { RemoteLoadServices as RemoteLoadServices } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadServices = (): LoadServices => {
    const apiUrl = process.env.API_URL as string
    return new RemoteLoadServices(apiUrl, makeAxiosHttpClient())
}
