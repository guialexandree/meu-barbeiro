import { AlertModel } from '@/domain/models'
import { LoadAlertsResult } from '../usecases'

export const mockAlert = (): AlertModel => ({
  id: 'any_id',
  message: 'any_message',
  type: 'home',
  status: 'ativo',
})

export const mockLoadAlertsResult: LoadAlertsResult = {
  success: true,
  message: 'Serviços carregados com sucesso',
  error: '',
  data: [
    {
      ...mockAlert(),
      type: 'home',
      message: 'No mês de novembro, todos os serviços com 10% de desconto',
    },
    {
      ...mockAlert(),
      type: 'services',
      status: 'inativo',
      message: 'No mês de novembro, todos os serviços com 10% de desconto',
    },
  ]
}
