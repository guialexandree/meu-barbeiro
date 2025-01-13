import { atom } from 'recoil'
import { AlertModel } from '@/domain/models'

export const alertsState = atom<AlertModel[]>({
  key: 'alertsState',
  default: [],
})
