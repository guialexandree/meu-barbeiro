import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: '',
})

export const passwordState = atom({
  key: 'passwordState',
  default: '',
})
