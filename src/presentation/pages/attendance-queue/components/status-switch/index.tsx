import React from 'react'
import { Fade, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

export const StatusSwitch: React.FC = () => {
  const [userType, setUserType] = React.useState('client')
  const [loading] = React.useState(false)

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
          mx: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" fontWeight={500} sx={{ ml: 3, fontFamily: 'Inter' }}>
          Status da fila
        </Typography>

        <ToggleButtonGroup
          size="small"
          color="success"
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
            Atendendo
          </ToggleButton>
          <ToggleButton value="barber" id="service-status-inactived" sx={{ fontSize: 12 }}>
            Encerrada
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Fade>
  )
}
