import { DateAdapter } from '@/data/protocols'
import { DayJsDateAdapter } from '@/infra/adapters'

export const makeDayJsAdapterFactory = (): DateAdapter => {
  return new DayJsDateAdapter()
}
