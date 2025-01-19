import { AlertModel } from '@/domain/models'
import faker from 'faker'

export const mockAlert = (): AlertModel => ({
  id: faker.datatype.uuid(),
  message: faker.random.words(15),
  type: faker.random.arrayElement(['home', 'services', 'history']),
  status: faker.random.arrayElement(['ativo', 'inativo']),
})

export const _mockAlerts: AlertModel[] = [
  {
    ...mockAlert(),
    type: 'home',
    message: 'No mês de novembro, todos os serviços com 10% de desconto',
  },
  {
    ...mockAlert(),
    type: 'history',
    message: 'A partir de janeiro, os preços dos serviços serão reajustados',
  },
  {
    ...mockAlert(),
    type: 'services',
    message: 'No mês de novembro, todos os serviços com 10% de desconto',
  },
]
