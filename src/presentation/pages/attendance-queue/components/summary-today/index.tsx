import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade, Grow, Paper, Typography } from '@mui/material'
import { GenericState } from '@/presentation/components/atoms'

export const SummaryToday: React.FC = () => {
  const companyState = useRecoilValue(GenericState.companyState)

  if (companyState?.statusAttendance !== 'closed') {
    return null
  }

  return (
    <>
      <Grow in unmountOnExit style={{ transitionDelay: '100ms' }}>
        <Paper
          id="status-queue-form"
          component="form"
          variant="outlined"
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
            backgroundColor: (theme) => `${theme.palette.primary.main}20`,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundImage: 'none'
          }}
        >
          <Fade in unmountOnExit>
            <Typography mt={1} variant="h1" >
              RESUMO DE HOJE
            </Typography>

          </Fade>
        </Paper>
      </Grow>
    </>
  )
}
