import React from 'react'
import { useRecoilState } from 'recoil'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { State } from '@/presentation/pages/alerts/components/atoms'

export const StatusAlertForm: React.FC = () => {
  const [status, setStatus] = useRecoilState(State.CreateUpdateForm.statusNewAlertState)

  return (
    <ToggleButtonGroup
      sx={{ pb: 1, height: 40 }}
      size="small"
      color="primary"
      value={status}
      exclusive
      onChange={(_, value) => {
        setStatus(value)
      }}
      aria-label="Platform"
    >
      <ToggleButton value="ativo" defaultChecked sx={{ fontSize: 12 }}>
        Ativo
      </ToggleButton>
      <ToggleButton value="inativo" sx={{ fontSize: 12 }}>
        Ocultar
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
