import { CreateService } from '@/domain/usecases'
import { RemoteCreateService } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteCreateService = (): CreateService => {
  const apiUrl = process.env.API_URL as string
  return new RemoteCreateService(apiUrl, makeAxiosHttpClient())
}
