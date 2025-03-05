import { ServiceStatus } from '@/domain/models'
import { atom, selector } from 'recoil'

const loadingServiceState = atom({
  key: 'isLoadingServiceUpdateState',
  default: false,
})

const loadingFormState = atom({
  key: 'isLoadingFormServiceCreateState',
  default: false,
})

const openRemoveConfirmState = atom({
  key: 'openRemoveServiceConfirmState',
  default: false,
})

const openUpdateConfirmState = atom({
  key: 'openUpdateServiceConfirmState',
  default: false,
})

const nameState = atom({
  key: 'nameServiceCreateState',
  default: {
    text: '',
    error: ''
  }
})

const descriptionState = atom({
  key: 'descriptionServiceCreateState',
  default: {
    text: '',
    error: ''
  }
})

const statusState = atom({
  key: 'statusServiceCreateState',
  default: 'ativo' as ServiceStatus
})

const priceState = atom({
  key: 'priceServiceCreateState',
  default: 0
})

const timeExecutionState = atom({
  key: 'timeExecutionServiceCreateState',
  default: 20
})

const serviceCreateState = selector({
  key: 'serviceCreateState',
  get: ({ get }) => {
    return {
      name: get(nameState).text,
      description: get(descriptionState).text,
      status: get(statusState),
      price: get(priceState),
      timeExecution: get(timeExecutionState)
    }
  }
})

export const State = {
  loadingFormState,
  loadingServiceState,
  openRemoveConfirmState,
  openUpdateConfirmState,
  nameState,
  descriptionState,
  statusState,
  priceState,
  timeExecutionState,
  serviceCreateState
}
