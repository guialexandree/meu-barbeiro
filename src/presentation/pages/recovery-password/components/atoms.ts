import { atom } from 'recoil'

export const loadingRecoveryPasswordState = atom({
  key: 'loadingRecoveryPasswordState',
  default: false
})

export const authCodeState = atom({
  key: 'authCodeState',
  default: {
    text: '',
    error: ''
  }
})

export const openRecoveryPasswordState = atom({
  key: 'openRecoveryPasswordState',
  default: false
})
