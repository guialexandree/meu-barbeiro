import { atom } from 'recoil'
import { makeLocalStorageAdapter } from '@/main/factories/cache'

export const localStorageAdapterState = atom({
  key: 'localStorageAdapterState',
  default: makeLocalStorageAdapter()
})
