import { atom } from 'recoil'
import { SimpleUser } from '@/domain/usecases'

const loadingUsersState = atom({
  key: 'loadingSimpleUsersState',
  default: false,
})

const usersState = atom<SimpleUser[]>({
  key: 'simpleUsersState',
  default: []
})

export const State = {
  loadingUsersState,
  usersState
}
