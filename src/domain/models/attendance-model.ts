import { ServiceModel } from '@/domain/models'

export enum AttendanceStatus {
  NaFila = 'nafila',
  EmAtendimento = 'ematendimento',
  Cancelado = 'cancelado',
}

export type AttendanceModel = {
  id: string
  createdAt: string
  services: ServiceModel[]
  client: {
    id: string
    name: string
    contactNumber: string
  }
  startDate: string | null
  cancellationDate: string | null
  cancellationReason: string
  status: AttendanceStatus
}
