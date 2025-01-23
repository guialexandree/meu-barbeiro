import { AlertModel } from '@/domain/models'
import { atom } from 'recoil'

export const isLoadingSaveAlertState = atom({
  key: 'isLoadingSaveAlertState',
  default: false,
})

export const errorAlertsState = atom({
  key: 'errorAlertState',
  default: '',
})

export const isLoadingLoadAlertsState = atom({
  key: 'isLoadingLoadAlertsState',
  default: false,
})

export const isOpenState = atom({
  key: 'isOpenCreateAlertState',
  default: false,
})

export const newAlertState = atom<AlertModel>({
  key: 'newAlertState',
  default: {
    id: '',
    message: '',
    type: 'home',
    status: 'ativo',
  },
})
