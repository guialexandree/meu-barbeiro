import React from 'react'
import { PageContainer, PageTitle } from '@/presentation/components'
import reportsHeaderImg from '@/presentation/assets/reports-header.png'
import { Grid2, Stack } from '@mui/material'
import { AttendanceIndicator, AttendancesGraphPanel, FinancialGraphPanel, MovementsIndicator, MovementsList } from '@/presentation/pages/reports/components'

const ReportsPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle title="Financeiro" subtitle="Atendimentos e movimentos de valores" icon={reportsHeaderImg} />

      <Stack direction="row" mx={2} spacing={1}>
        <AttendanceIndicator />
        <MovementsIndicator />
      </Stack>

      <MovementsList />

      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FinancialGraphPanel />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <AttendancesGraphPanel />
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default ReportsPage
