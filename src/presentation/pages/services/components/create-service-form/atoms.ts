import { atom, selector } from 'recoil'
import { ServiceModel } from '@/domain/models'

export const isOpenState = atom({
  key: 'isOpenCreateServiceState',
  default: false,
})

export const isLoadingState = atom({
  key: 'isLoadingCreateServiceState',
  default: false,
})

export const newServiceNameState = atom({
  key: 'newServiceNameState',
  default: '',
})

export const newServiceDescriptionState = atom({
  key: 'newServiceDescriptionState',
  default: '',
})

export const newServicePriceState = atom({
  key: 'newServicePriceState',
  default: 0,
})

export const newServiceTimeExecutionState = atom({
  key: 'newServiceTimeExecutionState',
  default: 0,
})

export const newServiceState = selector<Omit<ServiceModel, 'id'> | null>({
  key: 'newServiceState',
  get: ({ get }) => {
    const name = get(newServiceNameState)
    const description = get(newServiceDescriptionState)
    const price = get(newServicePriceState)
    const timeExecution = get(newServiceTimeExecutionState)

    return {
      name,
      description,
      price,
      timeExecution,
      status: 'ativo',
    }
  },
})
