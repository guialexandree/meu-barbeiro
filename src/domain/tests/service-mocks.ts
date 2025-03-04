import { LoadServicesResult } from '../usecases'

export const mockLoadServicesResult: LoadServicesResult = {
  success: true,
  message: 'Serviços carregados com sucesso',
  error: '',
  data: [
    {
      id: '1',
      name: 'Corte',
      description: 'Corte + Escovação',
      price: 30,
      timeExecution: 40,
      status: 'ativo',
    },
    {
      id: '2',
      name: 'Progressiva',
      description: 'Progressiva + Hidratação',
      price: 90,
      timeExecution: 120,
      status: 'inativo',
    },
    {
      id: '3',
      name: 'Reflexo',
      description: 'Reflexo + Hidratação',
      price: 60,
      timeExecution: 120,
      status: 'ativo',
    },
    {
      id: '4',
      name: 'Barba',
      description: '',
      price: 20,
      timeExecution: 15,
      status: 'ativo',
    },
    {
      id: '5',
      name: 'Hidratação',
      description: 'Hidratação',
      price: 20,
      timeExecution: 15,
      status: 'ativo',
    },
    {
      id: '6',
      name: 'Alisamento',
      description: 'Hidratação',
      price: 35,
      timeExecution: 120,
      status: 'ativo',
    },
    {
      id: '7',
      name: 'Botox',
      description: 'Botox + Hidratação',
      price: 40,
      timeExecution: 60,
      status: 'ativo',
    },
  ]
}
