import React from 'react'
import { useRecoilValue } from 'recoil'
import {Fade, Paper, Typography } from '@mui/material'
import { GenericState } from '@/presentation/components/atoms'

export const SummaryToday: React.FC = () => {
  const companyState = useRecoilValue(GenericState.companyState)

  if (companyState?.statusAttendance !== 'closed') {
    return null
  }

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
            mt: 1,
            py: 1,
            px: 3,
            mb: 1,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: (theme) => `${theme.palette.primary.dark}20`,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Fade in unmountOnExit>
            <Typography mt={1} variant="h6" fontWeight={900} fontFamily="Inter" letterSpacing={1}>
              Resumo de hoje
            </Typography>

          </Fade>
        </Paper>
      </Fade>
    </>
  )
}
