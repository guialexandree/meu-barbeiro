import { atom } from 'recoil'
import { AlertModel } from '@/domain/models'

export const alertsPanelState = atom({
  key: 'alertsPanelState',
  default: 'home' as 'home' | 'services' | 'history',
})

export const alertsState = atom<AlertModel[]>({
  key: 'alertsState',
  default: [],
})

export * from './create-alert-form/atoms'
