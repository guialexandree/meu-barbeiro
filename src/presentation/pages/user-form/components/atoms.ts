import { UserRole } from '@/domain/models'
import { atom, selector } from 'recoil'

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

const newClientFormState = selector({
  key: 'serviceCreateState',
  get: ({ get }) => {
    return {
      name: get(nameState).text,
      contactNumber: get(contactNumberState).text,
      password: get(passwordState).text,
      role: get(userTypeState)
    }
  }
})

export const State = {
  loadingFormState,
  errorFormState,
  successFormState,
  nameState,
  contactNumberState,
  passwordState,
  userTypeState,
  newClientFormState
}
