import { AttendanceModel, AttendanceStatus } from '@/domain/models'
import faker from 'faker'
import { _mockLoadServicesResult } from './service-mocks'

export const mockAttendance = (): AttendanceModel => ({
  id: faker.datatype.uuid(),
  createdAt: faker.date.recent().toISOString(),
  services: _mockLoadServicesResult.data.slice(0, faker.datatype.number({ min: 1, max: 3 })),
  client: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    contactNumber: faker.phone.phoneNumber(),
  },
  startDate: faker.date.recent().toISOString(),
  cancellationDate: faker.date.recent().toISOString(),
  cancellationReason: faker.random.words(5),
  status: faker.random.arrayElement([AttendanceStatus.NaFila, AttendanceStatus.EmAtendimento, AttendanceStatus.Cancelado]),
})

export const _mockAttendances: AttendanceModel[] = [...Array(8)].map(() => mockAttendance())