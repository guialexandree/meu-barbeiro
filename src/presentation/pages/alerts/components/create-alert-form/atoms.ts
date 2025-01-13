import { atom, selector } from 'recoil'
import { AlertModel, AlertStatus, AlertType } from '@/domain/models'

export const isOpenState = atom({
  key: 'isOpenCreateAlertState',
  default: false,
})

export const isLoadingState = atom({
  key: 'isLoadingCreateAlertState',
  default: false,
})

export const newAlertMessageState = atom({
  key: 'newAlertMessageState',
  default: '',
})

export const newAlertTypeState = atom<AlertType>({
  key: 'newAlertTypeState',
  default: 'home',
})

export const newAlertStatusState = atom<AlertStatus>({
  key: 'newAlertStatusState',
  default: 'ativo',
})

export const newAlertState = selector<Omit<AlertModel, 'id'> | null>({
  key: 'newAlertState',
  get: ({ get }) => {
    const message = get(newAlertMessageState)
    const type = get(newAlertTypeState)
    const status = get(newAlertStatusState)

    return {
      message,
      type,
      status,
    }
  },
})
