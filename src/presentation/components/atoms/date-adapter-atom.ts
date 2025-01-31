import { atom } from 'recoil'
import { makeDayJsAdapterFactory } from '@/main/factories/adapters'

export const dateAdapterState = atom({
  key: 'dateAdapterState',
  default: makeDayJsAdapterFactory()
})
