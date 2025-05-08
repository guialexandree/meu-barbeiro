import { ServiceModel, UserModel } from '@/domain/models'

export type AttendanceStatus = 'attending' | 'current' | 'in_queue' | 'canceled' | 'finished'

export type AttendanceModel = {
  id: string
  createdAt: string
  startedAt: string
  finishedAt: string
  services: AttendanceServiceModel[]
  user: UserModel
  canceledAt: string | null
  cancellationReason: string
  status: AttendanceStatus
}

type AttendanceServiceModel = {
  id: string
  service: ServiceModel
  price: number
}

export type AttendanceTotal = {
  finished: number
  inQueue: number
  amount: number
}

export type AttendanceDone = {
  id: string
  status: AttendanceStatus
  timeService: number
  amount: number
  startedAt: string
  finishedAt: string
  canceledAt: string | null
  user: {
    id: string
    name: string
    contactNumber: string
  }
}
