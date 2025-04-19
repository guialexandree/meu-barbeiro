import { atom } from 'recoil'
import { LoadUserByIdResult } from '@/domain/usecases'
import * as List from './attendances-list/atoms'

const loadingState = atom({
  key: 'loadingUserByIdState',
  default: true,
})

export const userResultState = atom<LoadUserByIdResult>({
  key: 'userByIdResultState',
  default: null as unknown as LoadUserByIdResult,
})

const errorUserState = atom({
  key: 'errorUserByIdState',
  default: '',
})

export const State = {
  loadingState,
  userResultState,
  errorUserState,
  List
}
