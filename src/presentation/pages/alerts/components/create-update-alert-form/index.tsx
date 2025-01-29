import React from 'react'
import { useRecoilState } from 'recoil'
import { Dialog, DialogContent, DialogTitle, Stack, Divider, Icon } from '@mui/material'
import { CreateAlert, RemoveAlert, UpdateAlert } from '@/domain/usecases'
import {
  InputAlertForm,
  ActionsAlertForm,
  StatusAlertForm,
  ActionRemoveAlertForm,
} from '@/presentation/pages/alerts/components'
import * as State from '@/presentation/pages/alerts/components/atoms'

type CreateUpdateAlertFormProps = {
  createAlert: CreateAlert
  updateAlert: UpdateAlert
  removeAlert: RemoveAlert
}

export const CreateUpdateAlertForm: React.FC<CreateUpdateAlertFormProps> = (props) => {
  const [open, setOpen] = useRecoilState(State.isOpenState)

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      keepMounted
      component="form"
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
          <DialogTitle variant="body2" color="grey.500" sx={{ p: 0, lineHeight: 1 }}>
            {`O aviso será exibido na tela do app do cliente`}
          </DialogTitle>
        </Stack>
      </Stack>
      <Divider />
      <DialogContent sx={{ width: '100%', pt: 1 }}>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <StatusAlertForm />
            <ActionRemoveAlertForm removeAlert={props.removeAlert} />
          </Stack>

          <InputAlertForm />
        </Stack>
      </DialogContent>

      <ActionsAlertForm createAlert={props.createAlert} updateAlert={props.updateAlert} />
    </Dialog>
  )
}
