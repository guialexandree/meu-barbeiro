import React from 'react'
import { useRecoilState } from 'recoil'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { State } from '@/presentation/pages/service-form/components/atoms'

export const ServiceFormStatus: React.FC = () => {
  const [status, setStatus] = useRecoilState(State.statusState)

  return (
    <ToggleButtonGroup
      sx={{ pb: 1 }}
      size="small"
      color="primary"
      value={status}
      id='service-status'
      exclusive
      onChange={(_, value) => {
        setStatus(value)
      }}
      aria-label="status do serviço"
    >
      <ToggleButton value="ativo" defaultChecked sx={{ fontSize: 12 }}>
        Exibir
      </ToggleButton>
      <ToggleButton value="inativo" sx={{ fontSize: 12 }}>
        Ocultar
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
