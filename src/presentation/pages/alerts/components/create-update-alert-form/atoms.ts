import { AlertModel, AlertStatus, AlertType } from '@/domain/models'
import { atom, selector } from 'recoil'

export const isLoadingSaveAlertState = atom({
  key: 'isLoadingSaveAlertState',
  default: false,
})

export const isOpenState = atom({
  key: 'isOpenCreateAlertState',
  default: false,
})

export const createUpdateAlertState = atom({
  key: 'createUpdateAlertState',
  default: {
    id: '',
    type: 'home' as AlertType,
  },
})

export const newAlertState = selector<AlertModel>({
  key: 'newAlertState',
  get: ({ get }) => {
    const alert = get(createUpdateAlertState)
    return {
      id: alert.id,
      type: alert.type,
      status: get(statusNewAlertState),
      message: get(messageNewAlertState),
    }
  }
})

export const messageNewAlertState = atom({
  key: 'messageNewAlertState',
  default: '',
})

export const statusNewAlertState = atom<AlertStatus>({
  key: 'statusNewAlertState',
  default: 'ativo'
})
