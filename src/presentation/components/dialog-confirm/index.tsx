import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Fade,
  Icon,
  Stack,
  Typography,
  Zoom,
} from '@mui/material'
import { CancelAction } from '../cancel-action'

type DialogConfirmProps = {
  openState: RecoilState<boolean>
  title: string
  answer: string
  onConfirm: () => Promise<void>
  icon?: string
  loading?: boolean
  labelConfirm?: string
  onClose?: VoidFunction
  children?: React.ReactNode
}

export const DialogConfirm: React.FC<DialogConfirmProps> = (props) => {
  const [open, setOpen] = useRecoilState(props.openState)

  const onClose = (): void => {
    props.onClose?.()
    setOpen(false)
  }

  const onConfirm = async (): Promise<void> => {
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
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          pl={2}
          sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}20` }}
        >
          <Icon color="info" sx={{ color: 'info.light' }}>
            {props.icon || 'info_outline'}
          </Icon>
          <Typography
            id="service-dialog-title"
            variant="h6"
            fontWeight={800}
            fontFamily="Inter"
            sx={{ py: 1.5, fontSize: 14, letterSpacing: 0.5, textTransform: 'uppercase' }}
          >
            {props.title}
          </Typography>
        </Stack>
        <Divider />
        <Fade in unmountOnExit mountOnEnter style={{ transitionDelay: `250ms` }}>
          <DialogContent>
            <Stack spacing={2}>
              <DialogContentText id="service-dialog-description">{props.answer}</DialogContentText>
              {props.children}
            </Stack>
          </DialogContent>
        </Fade>
        <DialogActions>
          <CancelAction onCancel={onClose} enterDelay={250} />

          <Zoom in unmountOnExit mountOnEnter style={{ transitionDelay: `250ms` }}>
            <Button
              variant="contained"
              loading={props.loading}
              onClick={onConfirm}
              autoFocus
              color="success"
              endIcon={<Icon>done_outline</Icon>}
            >
              {props.labelConfirm || 'Confirmar'}
            </Button>
          </Zoom>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
