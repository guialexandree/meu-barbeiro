import { atom } from 'recoil'
import { AlertModel } from '@/domain/models'

const loadingAlertsState = atom({
  key: 'loadingAlertsState',
  default: true,
})

const alertsPanelState = atom({
  key: 'alertsPanelState',
  default: 'home' as 'home' | 'services' | 'history',
})

const homeAlertState = atom<AlertModel>({
  key: 'homeAlertState',
  default: {
    id: '',
    message: '',
    type: 'home',
    status: 'ativo',
  },
})

const servicesAlertState = atom<AlertModel>({
  key: 'servicesAlertState',
  default: {
    id: '',
    message: '',
    type: 'services',
    status: 'ativo',
  },
})

const historyAlertState = atom<AlertModel>({
  key: 'historyAlertState',
  default: {
    id: '',
    message: '',
    type: 'history',
    status: 'ativo',
  },
})

const errorAlertsState = atom({
  key: 'errorAlertsState',
  default: '',
})

import * as CreateUpdateForm from './create-update-alert-form/atoms'

export const State = {
  loadingAlertsState,
  alertsPanelState,
  homeAlertState,
  servicesAlertState,
  historyAlertState,
  errorAlertsState,
  CreateUpdateForm,
}