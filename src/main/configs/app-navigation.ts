
export type Navigation = 'fila-atendimento' | 'servicos' | 'avisos' | 'clientes'

export type AppNavigation = {
    icon: string
    title: string
    subtitle: string
    pathTo: Navigation,
}

export const appNavigation: AppNavigation[] = [
  {
    icon: 'diamond',
    title: 'fila de atendimento',
    subtitle: 'projetos pessoais publicados',
    pathTo: 'fila-atendimento',
  },
  {
    icon: 'group',
    title: 'clientes',
    subtitle: 'Lista de clientes',
    pathTo: 'clientes',
  },
  {
    icon: 'content_cut',
    title: 'serviços',
    subtitle: 'detalhes da carreira e formação',
    pathTo: 'servicos',
  },
  {
    icon: 'sports_score',
    title: 'avisos',
    subtitle: 'desafios profissionais dev',
    pathTo: 'avisos',
  },
]
