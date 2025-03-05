import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Icon, Stack } from '@mui/material'

type DialogConfirmProps = {
  openState: RecoilState<boolean>
  title: string
  answer: string
  onConfirm: VoidFunction
  onClose?: VoidFunction
}

export const DialogConfirm: React.FC<DialogConfirmProps> = (props) => {
  const [open, setOpen] = useRecoilState(props.openState)

  const onClose = (): void => {
    props.onClose?.()
    setOpen(false)
  }

  const onConfirm = (): void => {
    props.onConfirm()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="service-dialog-title"
      aria-describedby="service-dialog-description"
    >
      <Stack direction="row" alignItems="center" justifyContent='space-between' mr={2}>
        <DialogTitle id="service-dialog-title">{props.title}</DialogTitle>
        <Icon>delete</Icon>
      </Stack>
      <Divider />
      <DialogContent>
        <DialogContentText id="service-dialog-description">{props.answer}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onConfirm} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
