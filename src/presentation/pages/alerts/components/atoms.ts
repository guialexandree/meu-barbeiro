import { atom } from 'recoil'
import { AlertModel } from '@/domain/models'

export const alertsPanelState = atom({
  key: 'alertsPanelState',
  default: 'home' as 'home' | 'services' | 'history',
})

export const homeAlertState = atom<AlertModel>({
  key: 'homeAlertState',
  default: {
    id: '',
    message: '',
    type: 'home',
    status: 'ativo',
  },
})

export const servicesAlertState = atom<AlertModel>({
  key: 'servicesAlertState',
  default: {
    id: '',
    message: '',
    type: 'services',
    status: 'ativo',
  },
})

export const historyAlertState = atom<AlertModel>({
  key: 'historyAlertState',
  default: {
    id: '',
    message: '',
    type: 'history',
    status: 'ativo',
  },
})

export * from './create-update-alert-form/atoms'
