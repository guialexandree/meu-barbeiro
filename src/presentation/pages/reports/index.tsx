import { PageContainer, PageTitle } from '@/presentation/components'
import React from 'react'
import reportsHeaderImg from '@/presentation/assets/reports-header.png'

const ReportsPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle
        title="Relatórios"
        subtitle="Acompanhe a fila de atendimento"
        icon={reportsHeaderImg}
      />
    </PageContainer>
  )
}

export default ReportsPage
