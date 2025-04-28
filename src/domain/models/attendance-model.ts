import { ServiceModel, UserModel } from '@/domain/models'

export enum AttendanceStatus {
  EmAtendimento = 'attending',
  NaVez = 'current',
  NaFila = 'in_queue',
  Cancelado = 'canceled',
  Atendido = 'finished',
}

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