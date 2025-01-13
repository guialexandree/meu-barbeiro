import { UpdateService } from '@/domain/usecases'
import { RemoteUpdateService } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteUpdateService = (): UpdateService => {
  const apiUrl = process.env.API_URL || 'http://localhost:3000'
  return new RemoteUpdateService(apiUrl, makeAxiosHttpClient())
}
