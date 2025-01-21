import { atom } from 'recoil'
import { ServiceModel } from '@/domain/models'

export const isLoadingCreateUpdateState = atom({
  key: 'isLoadingCreateUpdateState',
  default: false,
})

export const isOpenFormServiceState = atom({
  key: 'isOpenFormServiceState',
  default: false,
})

export const newServiceState = atom<ServiceModel>({
  key: 'newServiceState',
  default: {
    id: '',
    name: '',
    description: '',
    status: 'ativo',
    price: 0,
    timeExecution: 20,
  }
})
