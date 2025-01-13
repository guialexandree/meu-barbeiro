import { GetAlerts } from '@/domain/usecases'
import { RemoteGetAlerts } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/adapters'

export const makeRemoteGetAlerts = (): GetAlerts => {
  const apiUrl = process.env.API_URL || 'http://localhost:3000'
  return new RemoteGetAlerts(apiUrl, makeAxiosHttpClient())
}
