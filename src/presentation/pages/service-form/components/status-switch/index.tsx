import React from 'react'
import { useRecoilState } from 'recoil'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { State } from '@/presentation/pages/service-form/components/atoms'

export const ServiceFormStatus: React.FC = () => {
  const [status, setStatus] = useRecoilState(State.statusState)

  return (
    <ToggleButtonGroup
      size="small"
      color="secondary"
      value={status}
      id='service-status'
      exclusive
      onChange={(_, value) => {
        if (value) {
          setStatus(value)
        }
      }}
      aria-label="status do serviço"
    >
      <ToggleButton value="actived" id='service-status-actived' defaultChecked sx={{ fontSize: 12 }}>
        Exibir
      </ToggleButton>
      <ToggleButton value="deactivated" id='service-status-inactived' sx={{ fontSize: 12 }}>
        Ocultar
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
