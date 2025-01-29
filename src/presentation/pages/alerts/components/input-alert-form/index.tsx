import React from 'react'
import { useRecoilState } from 'recoil'
import { TextField } from '@mui/material'
import * as State from '@/presentation/pages/alerts/components/atoms'

export const InputAlertForm: React.FC = () => {
  const [message, setMessage] = useRecoilState(State.messageNewAlertState)

  return (
    <TextField
      multiline
      autoFocus
      value={message}
      onChange={(event) => {
        setMessage(event.target.value)
      }}
      label="Mensagem"
      name="message"
      size="small"
      rows={4}
      fullWidth
    />
  )
}
