import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CircularProgress, Fade, Paper, Skeleton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { ChangeStatusDialog } from '@/presentation/pages/attendance-queue/components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'

export const StatusSwitch: React.FC = () => {
  const setOpen = useSetRecoilState(State.openChangeStatusDialogState)
  const companyState = useRecoilValue(GenericState.companyState)
  const loadingCompany = useRecoilValue(GenericState.loadingCompanyState)
  const loading= useRecoilValue(State.loadingChangeStatusState)

  const handleChangeStatus = (_: React.MouseEvent<HTMLElement>, value: string) => {
    if (value) {
      setOpen(true)
    }
  }

  const colorStatus = {
    serving: 'success',
    closed: 'warning',
  }[companyState.statusAttendance]

  if (loading) {
    return (
      <Paper
        id="status-queue-form"
        component="form"
        variant="elevation"
        elevation={0}
        onSubmit={(event) => {
          event.preventDefault()
        }}
        sx={{
          py: 1.2,
          pr: 1.2,
          mx: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="body2" fontWeight={500} sx={{ ml: 3, fontFamily: 'Inter' }}>
          Gravando novo status da fila
        </Typography>
        <CircularProgress size={30} />
      </Paper>
    )
  }

  return (
    <>
      <Fade in timeout={500} style={{ transitionDelay: '100ms' }} unmountOnExit>
        <Paper
          id="status-queue-form"
          component="form"
          variant="elevation"
          elevation={0}
          onSubmit={(event) => {
            event.preventDefault()
          }}
          sx={{
            py: 1.2,
            pr: 1.2,
            mx: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" fontWeight={500} sx={{ ml: 3, fontFamily: 'Inter' }}>
            Fila de atendimento
          </Typography>

          {companyState ? (
            <ToggleButtonGroup
              size="small"
              color={colorStatus as any}
              value={companyState.statusAttendance}
              id="status-queue"
              exclusive
              disabled={loadingCompany}
              sx={{ backgroundColor: 'grey.900' }}
              onChange={handleChangeStatus}
              aria-label="status do serviço"
            >
              <ToggleButton value="serving" id="service-status-actived" sx={{ fontSize: 12 }}>
                Atendendo
              </ToggleButton>
              <ToggleButton value="closed" id="service-status-inactived" defaultChecked sx={{ fontSize: 12 }}>
                Encerrada
              </ToggleButton>
            </ToggleButtonGroup>
          ) : (
            <Skeleton variant="text" width={175} height={37} />
          )}
        </Paper>
      </Fade>

      <ChangeStatusDialog />
    </>
  )
}
