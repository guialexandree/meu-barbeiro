import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Fade, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { State } from '@/presentation/pages/service-form/components/atoms'

export const StatusSwitch: React.FC = () => {
  const [userType, setUserType] = useRecoilState(State.statusState)
  const loading = useRecoilValue(State.loadingFormState)

  return (
    <Fade in timeout={500} style={{ transitionDelay: '100ms' }} unmountOnExit>
      <Paper
        id="client-create-form"
        component="form"
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
          Status do Serviço
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
          <ToggleButton value="actived" id="service-status-actived" defaultChecked sx={{ fontSize: 12 }}>
            Ativo
          </ToggleButton>
          <ToggleButton value="deactivated" id="service-status-inactived" sx={{ fontSize: 12 }}>
            Inativo
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Fade>
  )
}
