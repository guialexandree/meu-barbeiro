import { atom } from 'recoil'
import { UserModel } from '@/domain/models'
import * as List from './attendances-list/atoms'

const loadingState = atom({
  key: 'loadingUserByIdState',
  default: true,
})

export const userState = atom<UserModel & { inQueue: boolean }>({
  key: 'userByIdResultState',
  default: null as unknown as UserModel & { inQueue: boolean },
})

const errorUserState = atom({
  key: 'errorUserByIdState',
  default: '',
})

export const State = {
  loadingState,
  userState,
  errorUserState,
  List
}
