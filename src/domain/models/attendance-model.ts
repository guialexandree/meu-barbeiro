import { ServiceModel, UserModel } from '@/domain/models'

export type AttendanceStatus = 'attending' | 'current' | 'in_queue' | 'canceled' | 'finished'

export type AttendanceModel = {
  id: string
  createdAt: string
  startedAt: Date | null
  finishedAt: Date | null
  services: AttendanceServiceModel[]
  user: UserModel
  cancellationDate: string | null
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