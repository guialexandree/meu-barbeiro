import { PageContainer, PageTitle } from '@/presentation/components'
import React from 'react'
import attendanceHeaderImg from '@/presentation/assets/aparador.png'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle
        title="Fila de Atedimento"
        subtitle="Acompanhe a fila de atendimento"
        icon={attendanceHeaderImg}
      />
    </PageContainer>
  )
}

export default AttendanceQueuePage
