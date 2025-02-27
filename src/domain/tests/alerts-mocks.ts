import { AlertModel } from '@/domain/models'

export const mockAlert = (): AlertModel => ({
  id: 'any_id',
  message: 'any_message',
  type: 'home',
  status: 'ativo',
})

export const _mockAlerts: AlertModel[] = [
  {
    ...mockAlert(),
    type: 'home',
    message: 'No mês de novembro, todos os serviços com 10% de desconto',
  },
  {
    ...mockAlert(),
    type: 'services',
    message: 'No mês de novembro, todos os serviços com 10% de desconto',
  },
]
