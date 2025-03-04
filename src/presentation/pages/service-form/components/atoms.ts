import { atom, selector } from 'recoil'

const idServiceCreateState = atom({
  key: 'idServiceCreateState',
  default: ''
})

const loadingState = atom({
  key: 'isLoadingServiceCreateState',
  default: false,
})

const nameState = atom({
  key: 'nameServiceCreateState',
  default: {
    text: '',
    error: ''
  }
})

const descriptionState = atom({
  key: 'descriptionServiceCreateState',
  default: {
    text: '',
    error: ''
  }
})

const statusState = atom<'ativo' | 'inativo'>({
  key: 'statusServiceCreateState',
  default: 'ativo'
})

const priceState = atom({
  key: 'priceServiceCreateState',
  default: 0
})

const timeExecutionState = atom({
  key: 'timeExecutionServiceCreateState',
  default: 20
})

const serviceCreateState = selector({
  key: 'serviceCreateState',
  get: ({ get }) => {
    return {
      id: get(idServiceCreateState),
      name: get(nameState).text,
      description: get(descriptionState).text,
      status: get(statusState),
      price: get(priceState),
      timeExecution: get(timeExecutionState)
    }
  }
})


export const State = {
  idServiceCreateState,
  loadingState,
  nameState,
  descriptionState,
  statusState,
  priceState,
  timeExecutionState,
  serviceCreateState
}
