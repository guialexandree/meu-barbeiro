import { atom, selector } from 'recoil'
import { AddAttendanceInQueueParams, SimpleUser } from '@/domain/usecases'
import { ServiceModel } from '@/domain/models'

const loadingState = atom({
  key: 'loadingAddAttendanceInQueueState',
  default: false,
})

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

const positionState = atom<'first' | 'last'>({
  key: 'positionInQueueState',
  default: 'last',
})

const newAttendandeState = selector<AddAttendanceInQueueParams>({
  key: 'newAttendandeState',
  get: ({ get }) => {
    const user = get(selectedUserState)
    const services = get(selectedServicesState)
    const position = get(positionState)

    return {
      userId: user?.id,
      services: services.map(service => service.id),
      position
    }
  }
})

export const State = {
  loadingState,
  loadingUsersState,
  loadingServicesState,
  selectedServicesState,
  selectedUserState,
  positionState,
  newAttendandeState,
  usersState
}
