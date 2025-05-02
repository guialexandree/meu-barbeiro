import { atom } from 'recoil'
import { SimpleUser } from '@/domain/usecases'
import { ServiceModel } from '@/domain/models'

const loadingUsersState = atom({
  key: 'loadingSimpleUsersState',
  default: false,
})

const loadingServicesState = atom({
  key: 'loadingSimpleServicesQueueState',
  default: false,
})

const usersState = atom<SimpleUser[]>({
  key: 'simpleUsersState',
  default: []
})

const selectedUserState = atom<{ id: string, label: string }>({
  key: 'selectedUserQueueState',
  default: null as unknown as { id: string, label: string },
})

const selectedServicesState = atom<ServiceModel[]>({
  key: 'selectedServicesQueueState',
  default: []
})

export const State = {
  loadingUsersState,
  loadingServicesState,
  selectedServicesState,
  selectedUserState,
  usersState
}
