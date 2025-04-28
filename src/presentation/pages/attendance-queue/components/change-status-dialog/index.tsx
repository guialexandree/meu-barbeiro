import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Button from '@mui/material/Button'
import { Factories } from '@/main/factories/usecases'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon } from '@mui/material/'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { useNotify, useWithMinimunDelay } from '@/presentation/hooks'
import { GenericState } from '@/presentation/components/atoms'
import { CancelAction } from '@/presentation/components'

export const ChangeStatusDialog = () => {
  const { notify } = useNotify()
  const { withMinimumDelay } = useWithMinimunDelay()
  const [open, setOpen] = useRecoilState(State.openChangeStatusDialogState)
  const [company, setCompany] = useRecoilState(GenericState.companyState)
  const setLoading = useSetRecoilState(State.loadingChangeStatusState)

  const startAttendanceCompany = React.useMemo(() => Factories.makeRemoteStartAttendanceCompany(), [])
  const closedAttendanceCompany = React.useMemo(() => Factories.makeRemoteClosedAttendanceCompany(), [])

  const handleStartAttendance = async () => {
    setLoading(true)
    startAttendanceCompany
      .start()
      .then((result) => {
        if (result.success) {
          setCompany(result.data)
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch(console.error)
  }

  const handleEndAttendance = async () => {
    setLoading(true)
    return closedAttendanceCompany
      .closed()
      .then((result) => {
        if (result.success) {
          setCompany(result.data)
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch(console.error)
  }

  const handleConfirm = async () => {
    const action = {
      serving: handleEndAttendance,
      closed: handleStartAttendance,
    }[company?.statusAttendance || 'closed']

    handleClose()
    await withMinimumDelay(action, 1200)
    setLoading(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const messageStatus = {
    serving: 'Confirma encerramento da fila de atendimento?',
    closed: 'Confirma abertura da fila de atendimento?',
  }[company?.statusAttendance || 'closed']

  const labelActionStatus = {
    serving: 'encerrar',
    closed: 'confirmar',
  }[company?.statusAttendance || 'closed']

  return (
    <Dialog
      open={open}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'background.default',
          }
        }
      }}
      onClose={handleClose}
      aria-labelledby="change-status-dialog-title"
      aria-describedby="change-status-dialog-description"
    >
      <DialogTitle id="change-status-dialog-title">{'Fila de atendimento'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="change-status-dialog-description">{messageStatus}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelAction onCancel={handleClose} />
        <Button variant="contained" onClick={handleConfirm} autoFocus endIcon={<Icon>done_outline</Icon>}>
          {labelActionStatus}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
