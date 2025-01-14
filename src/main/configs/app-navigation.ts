
export type Navigation = 'fila-atendimento' | 'servicos' | 'avisos' | 'clientes' | 'relatorios'

export type AppNavigation = {
    icon: string
    title: string
    subtitle: string
    pathTo: Navigation,
}

export const appNavigation: AppNavigation[] = [
  {
    icon: 'diamond',
    title: 'atendimento',
    subtitle: 'fila de atendimento',
    pathTo: 'fila-atendimento',
  },
  {
    icon: 'group',
    title: 'clientes',
    subtitle: 'gerenciamento de clientes',
    pathTo: 'clientes',
  },
  {
    icon: 'bar_chart',
    title: 'relatórios',
    subtitle: 'relatórios de atendimento e financeiro',
    pathTo: 'relatorios',
  },
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
