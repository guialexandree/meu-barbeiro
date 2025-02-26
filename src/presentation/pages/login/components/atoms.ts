import { atom } from 'recoil'

export const loadingLoginState = atom({
  key: 'loadingLoginState',
  default: false
})

export const usernameState = atom({
  key: 'usernameState',
  default: {
    text: '',
    error: '',
  }
})

export const passwordState = atom({
  key: 'passwordState',
  default: {
    text: '',
    error: '',
  }
})
