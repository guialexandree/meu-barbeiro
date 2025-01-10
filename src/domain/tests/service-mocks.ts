import { ServiceModel } from '@/domain/models'

export const _mockServices: ServiceModel[] = [
  {
    id: 1,
    name: 'Corte',
    decription: '',
    price: 30,
    time: 40,
  },
  {
    id: 2,
    name: 'Progressiva',
    decription: 'Progressiva + Corte',
    price: 90,
    time: 120,
  },
  {
    id: 3,
    name: 'Reflexo',
    decription: 'Reflexo + Hidratação',
    price: 60,
    time: 120,
  },
  {
    id: 4,
    name: 'Hidratação',
    decription: 'Hidratação',
    price: 20,
    time: 120,
  },
]
