import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fade,
  Icon,
  Slide,
  Stack,
} from '@mui/material'
import { CancelAction } from '../cancel-action'

type DialogConfirmProps = {
  openState: RecoilState<boolean>
  title: string
  answer: string
  onConfirm: VoidFunction
  icon?: string
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
      slotProps={{
        paper: {
          sx: {
            backgroundImage: 'none',
            backgroundColor: 'background.default',
          },
        },
      }}
      onClose={onClose}
      aria-labelledby="service-dialog-title"
      aria-describedby="service-dialog-description"
    >
      <Box sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}20` }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mr={2}>
          <DialogTitle id="service-dialog-title" sx={{ textTransform: 'uppercase' }}>
            {props.title}
          </DialogTitle>
          <Icon>{props.icon || 'delete'}</Icon>
        </Stack>
        <Divider />
        <Fade in unmountOnExit mountOnEnter style={{ transitionDelay: `250ms` }}>
          <DialogContent>
            <DialogContentText id="service-dialog-description">{props.answer}</DialogContentText>
          </DialogContent>
        </Fade>
        <DialogActions>
          <CancelAction onCancel={onClose} enterDelay={250} />

          <Slide in direction="left" unmountOnExit mountOnEnter style={{ transitionDelay: `250ms` }}>
            <Button variant="contained" onClick={onConfirm} autoFocus color="success">
              Confirmar
            </Button>
          </Slide>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
