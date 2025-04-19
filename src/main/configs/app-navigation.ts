
export type Navigation = '/' | 'servicos' | 'avisos' | 'clientes' | 'relatorios'

export type AppNavigation = {
    icon: string
    title: string
    subtitle: string
    pathTo: Navigation,
}

export const appNavigation: AppNavigation[] = [
  {
    icon: 'sort',
    title: 'atendimento',
    subtitle: 'fila de atendimento',
    pathTo: '/',
  },
  {
    icon: 'group',
    title: 'clientes',
    subtitle: 'gerenciamento de clientes',
    pathTo: 'clientes',
  },
  // {
  //   icon: 'bar_chart',
  //   title: 'financeiro',
  //   subtitle: 'relatórios de atendimento e financeiro',
  //   pathTo: 'relatorios',
  // },
  {
    icon: 'content_cut',
    title: 'serviços',
    subtitle: 'cadastro de serviços e tabela de preços',
    pathTo: 'servicos',
  },
  {
    icon: 'notification_add',
    title: 'avisos',
    subtitle: 'cadastro de avisos para clientes',
    pathTo: 'avisos',
  },
]
