import { LoadDefaultService } from '@/domain/usecases'
import { RemoteLoadDefaultService } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteLoadDefaultService = (): LoadDefaultService => {
    const apiUrl = process.env.API_URL as string
    return new RemoteLoadDefaultService(apiUrl, makeAxiosHttpClient())
}
