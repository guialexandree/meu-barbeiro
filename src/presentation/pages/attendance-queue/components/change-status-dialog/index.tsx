import React from 'react'
import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon } from '@mui/material/'
import { useRecoilState } from 'recoil'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { useNotify } from '@/presentation/hooks'
import { GenericState } from '@/presentation/components/atoms'
import { Factories } from '@/main/factories/usecases'

export const ChangeStatusDialog = () => {
  const { notify } = useNotify()
  const [open, setOpen] = useRecoilState(State.openChangeStatusDialogState)
  const [company, setCompany] = useRecoilState(GenericState.companyState)

  const startAttendanceCompany = React.useMemo(() => Factories.makeRemoteStartAttendanceCompany(), [])
  const closedAttendanceCompany = React.useMemo(() => Factories.makeRemoteClosedAttendanceCompany(), [])

  const handleStartAttendance = () => {
    startAttendanceCompany
      .start()
      .then((result) => {
        if (result.success) {
          setCompany((currentState) => ({ ...currentState, statusAttendance: 'serving' }))
          notify('Fila de atendimento aberta com sucesso!')
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch(console.error)
  }

  const handleEndAttendance = () => {
    closedAttendanceCompany
      .closed()
      .then((result) => {
        if (result.success) {
          setCompany((currentState) => ({ ...currentState, statusAttendance: 'closed' }))
          notify('Fila de atendimento encerrada com sucesso!')
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch(console.error)
  }

  const handleConfirm = () => {
    const action = {
      serving: handleEndAttendance,
      closed: handleStartAttendance,
    }[company.statusAttendance]

    action()
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const messageStatus = {
    serving: 'Confirma encerramento da fila de atendimento?',
    closed: 'Confirma abertura da fila de atendimento?',
  }[company.statusAttendance]

  const labelActionStatus = {
    serving: 'encerrar',
    closed: 'confirmar',
  }[company.statusAttendance]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="change-status-dialog-title"
      aria-describedby="change-status-dialog-description"
    >
      <DialogTitle id="change-status-dialog-title">{'Fila de atendimento'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="change-status-dialog-description">{messageStatus}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancelar</Button>
        <Button variant="contained" onClick={handleConfirm} autoFocus endIcon={<Icon>done_outline</Icon>}>
          {labelActionStatus}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
