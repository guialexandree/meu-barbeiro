import { ServiceModel } from '@/domain/models'
import { atom } from 'recoil'

export const servicesSearchState = atom({
  key: 'servicesSearchState',
  default: '',
})

export const statusSearchState = atom({
  key: 'statusSearchState',
  default: 'ativo' as 'ativo' | 'inativo',
})

export const servicesState = atom<ServiceModel[]>({
  key: 'servicesState',
  default: [],
})
