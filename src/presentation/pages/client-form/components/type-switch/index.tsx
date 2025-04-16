import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Fade, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { State } from '@/presentation/pages/client-form/components/atoms'

export const TypeSwitch: React.FC = () => {
  const [userType, setUserType] = useRecoilState(State.userTypeState)
  const loading = useRecoilValue(State.loadingFormState)

  return (
    <Fade in timeout={500} style={{ transitionDelay: '100ms' }} unmountOnExit>
      <Paper
        id="client-create-form"
        component="form"
        variant="elevation"
        elevation={0}
        onSubmit={(event) => {
          event.preventDefault()
        }}
        sx={{
          py: 1.2,
          pr: 1.2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" fontWeight={500} sx={{ ml: 3, fontFamily: 'Inter' }}>
          Tipo de cadastro
        </Typography>

        <ToggleButtonGroup
          size="small"
          color="secondary"
          value={userType}
          id="service-status"
          exclusive
          disabled={loading}
          sx={{ backgroundColor: 'grey.900' }}
          onChange={(_, value) => {
            if (value) {
              setUserType(value)
            }
          }}
          aria-label="status do serviço"
        >
          <ToggleButton value="client" id="service-status-actived" defaultChecked sx={{ fontSize: 12 }}>
            Cliente
          </ToggleButton>
          <ToggleButton value="barber" id="service-status-inactived" sx={{ fontSize: 12 }}>
            Barbeiro
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Fade>
  )
}
