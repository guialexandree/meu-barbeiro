import React from 'react'
import { useRecoilState } from 'recoil'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Divider,
  Icon,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import * as State from '@/presentation/pages/alerts/components/atoms'

export const CreateAlertForm: React.FC = () => {
  const [open, setOpen] = useRecoilState(State.isOpenState)
  const [message, setMessage] = useRecoilState(State.newAlertMessageState)

  const handleSubmit = (): void => {
    setOpen(false)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      keepMounted
      component="form"
      onSubmit={handleSubmit}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '.MuiPaper-root': {
          width: '100%',
        },
      }}
    >
      <DialogTitle>{'Criar novo serviço'}</DialogTitle>
      <Divider />
      <DialogContent sx={{ width: '100%' }}>
        <Stack spacing={1}>
          <ToggleButtonGroup
            sx={{ pb: 1, height: 40 }}
            size="small"
            color="primary"
            value={status}
            exclusive
            onChange={() => {}}
            aria-label="Platform"
          >
            <ToggleButton value="ativo" sx={{ fontSize: 12 }}>Ativo</ToggleButton>
            <ToggleButton value="inativo" sx={{ fontSize: 12 }}>Ocultar</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            multiline
            value={message}
            onChange={event => { setMessage(event.target.value) }}
            label="Mensagem"
            name="message"
            fullWidth
          />

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleClose}
          type="submit"
          endIcon={<Icon>check</Icon>}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
