import { HttpClient } from '@/data/protocols'
import { AxiosAdapter } from '@/infra/http'

export const makeAxiosHttpClient = (): HttpClient => new AxiosAdapter()
