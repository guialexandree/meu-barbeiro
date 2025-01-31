import React from 'react'
import { useRecoilState } from 'recoil'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import * as State from '@/presentation/pages/services/components/atoms'

export const CreateUpdateServiceStatus: React.FC = () => {
  const [status, setStatus] = useRecoilState(State.statusNewServiceState)

  return (
    <ToggleButtonGroup
      sx={{ pb: 1 }}
      size="small"
      color="primary"
      value={status}
      exclusive
      onChange={(_, value) => {
        setStatus(value)
      }}
      aria-label="status do serviço"
    >
      <ToggleButton value="ativo" defaultChecked sx={{ fontSize: 10 }}>
        Ativo
      </ToggleButton>
      <ToggleButton value="inativo" sx={{ fontSize: 10 }}>
        Ocultar
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
