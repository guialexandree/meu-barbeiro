import React from 'react'
import { PageContainer, PageTitle } from '@/presentation/components'
import reportsHeaderImg from '@/presentation/assets/reports-header.png'
import { Grid2, Icon, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack, useTheme, Zoom } from '@mui/material'
import {
  AttendanceIndicator,
  AttendancesGraphPanel,
  FinancialGraphPanel,
  MovementsIndicator,
  MovementsList,
} from '@/presentation/pages/financial/components'

const actions = [
  { icon: <Icon>file_copy</Icon>, name: 'Copy' },
  { icon: <Icon>save</Icon>, name: 'Save' },
  { icon: <Icon>print</Icon>, name: 'Print' },
  { icon: <Icon>share</Icon>, name: 'Share' },
]

const FinancialPage: React.FC = () => {
  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

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

      <Zoom in timeout={transitionDuration} unmountOnExit>

          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            color={theme.palette.secondary.main}
          >
            {actions.map((action) => (
              <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
            ))}
          </SpeedDial>
      </Zoom>
    </PageContainer>
  )
}

export default FinancialPage
