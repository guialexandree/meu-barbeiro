import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button, Fade, Paper, Skeleton, Typography } from '@mui/material'
import { ChangeStatusDialog } from '@/presentation/pages/attendance-queue/components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'

export const StatusSwitch: React.FC = () => {
  const setOpen = useSetRecoilState(State.openDialog)
  const companyState = useRecoilValue(GenericState.companyState)
  const loading = useRecoilValue(State.loadingChangeStatusState)

  return (
    <>
      <Fade in unmountOnExit style={{ transitionDelay: '100ms' }}>
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
            pr: 2,
            pl: 3,
            mb: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Fade in unmountOnExit>
            <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Inter' }}>
              Fila de atendimento
            </Typography>
          </Fade>

          {!companyState && <Skeleton variant="rounded" width={175} height={37} />}

          {companyState.statusAttendance === 'closed' && (
            <Button
              variant="contained"
              color="success"
              loading={loading}
              size="small"
              sx={{
                boxShadow: 0,
                backgroundColor: 'success.light',
                minWidth: 128,
                fontWeight: '700',
                fontFamily: 'Inter',
              }}
              onClick={() => {
                setOpen(true)
              }}
            >
              Abrir Fila
            </Button>
          )}
          {companyState.statusAttendance === 'serving' && (
            <Button
              variant="contained"
              loading={loading}
              color="secondary"
              size="small"
              sx={{
                boxShadow: 0,
                backgroundColor: 'secondary.light',
                minWidth: 128,
                fontWeight: '700',
                fontFamily: 'Inter',
              }}
              onClick={() => {
                setOpen(true)
              }}
            >
              Encerrar Fila
            </Button>
          )}
        </Paper>
      </Fade>
      <ChangeStatusDialog />
    </>
  )
}
