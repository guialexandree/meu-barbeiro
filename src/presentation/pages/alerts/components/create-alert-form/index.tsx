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
  const [status, setStatus] = useRecoilState(State.newAlertStatusState)

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
      <Stack direction="row" alignItems="center" mx={2} spacing={2} p={1}>
        <Icon sx={{ m: 0 }} color="secondary">
          notification_add
        </Icon>
        <Stack>
          <DialogTitle sx={{ p: 0 }}>{'Configurar aviso'}</DialogTitle>
          <DialogTitle
            variant="body2"
            color="grey.500"
            sx={{ p: 0, lineHeight: 1 }}
          >
            {'O aviso será exibido na tela principal do app do cliente'}
          </DialogTitle>
        </Stack>
      </Stack>
      <Divider />
      <DialogContent sx={{ width: '100%', pt: 1 }}>
        <Stack spacing={1} >
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

          <TextField
            multiline
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
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
