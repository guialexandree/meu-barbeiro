import { UserRole } from '@/domain/models'
import { atom } from 'recoil'

const loadingFormState = atom({
  key: 'isLoadingFormClientCreateState',
  default: false,
})

const errorFormState = atom({
  key: 'errorFormClientCreateState',
  default: '',
})

const successFormState = atom({
  key: 'isSuccessFormClientCreateState',
  default: false,
})

const nameState = atom({
  key: 'nameClientCreateState',
  default: {
    text: '',
    error: ''
  }
})

const contactNumberState = atom({
  key: 'contactNumberStateClientForm',
  default: {
    text: '',
    error: ''
  }
})

const passwordState = atom({
  key: 'passwordStateClientForm',
  default: {
    text: '',
    error: ''
  }
})

const userTypeState = atom<UserRole>({
  key: 'typeClientStateClientForm',
  default: 'client'
})

export const State = {
  loadingFormState,
  errorFormState,
  successFormState,
  nameState,
  contactNumberState,
  passwordState,
  userTypeState,
}
