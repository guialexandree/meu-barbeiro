import { atom } from 'recoil'
import { ServiceModel } from '@/domain/models'

export const isLoadingUpdateState = atom({
  key: 'isLoadingUpdateServiceState',
  default: false,
})

export const updateServiceState = atom({
  key: 'updateServiceState',
  default: null as unknown as ServiceModel,
})
