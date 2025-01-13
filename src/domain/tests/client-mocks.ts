import faker from 'faker'
import { ClientResult } from '@/domain/models'

export const mockCliente: ClientResult = {
  id: faker.datatype.number(50),
  name: faker.name.findName(),
  status: 'actived',
  username: faker.internet.userName(),
  contactNumber: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  createdAt: faker.date.recent(),
}

export const _mockClients: ClientResult[] = Array.from({ length: 10 }, () => mockCliente)
