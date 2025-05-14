import React from 'react'
import { Icon, ListItemIcon, MenuItem } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'
import { Menu } from '@/presentation/components'

type MenuActionsProps = {
  id: string
  anchorOrigin: {
    horizontal: number | 'left' | 'center' | 'right'
    vertical: number | 'top' | 'bottom'
  }
  attendanceId: string
  setLoading: (loading: boolean) => void
  endSuccess: (attendanceId: string) => void
  cancelSuccess: (attendanceId: string) => void
  onClose: VoidFunction
  anchorEl: HTMLElement | null
}

export const MenuActions: React.FC<MenuActionsProps> = (props) => {
  const { notify } = useNotify()

  const cancelAttendance = React.useMemo(() => Factories.makeRemoteCancelAttendance(), [])
  const reAddAttendanceInQueue = React.useMemo(() => Factories.makeRemoteReAddAttendanceInQueue(), [])

  const handleClose = () => {
    props.onClose()
  }

  const handleAddAttendanceInQueue = () => {
    props.setLoading(true)
    handleClose()
    reAddAttendanceInQueue
      .reAdd({
        position: 'last',
        id: props.attendanceId,
       })
      .then((result) => {
        if (result.success) {
          props.endSuccess(result.data.id)
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch((error) => {
        notify(error, { type: 'error' })
      })
      .finally(() => {
        props.setLoading(false)
        handleClose()
      })
  }

  const handleCancelAttendance = () => {
    props.setLoading(true)
    handleClose()
    cancelAttendance
      .cancel({ attendanceId: props.attendanceId, reason: 'PERDEU A VEZ' })
      .then((result) => {
        if (result.success) {
          props.cancelSuccess(props.attendanceId)
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch((error) => {
        notify(error, { type: 'error' })
      })
      .finally(() => {
        props.setLoading(false)
        handleClose()
      })
  }

  return (
    <Menu anchorOrigin={props.anchorOrigin} id={props.id} anchorEl={props.anchorEl} onClose={handleClose}>
      <MenuItem onClick={handleAddAttendanceInQueue}>
        <ListItemIcon >
          <Icon sx={{ color: 'grey.900' }} fontSize="small">
            south
          </Icon>
        </ListItemIcon>
        Enviar para o final da fila
      </MenuItem>
      <MenuItem onClick={handleCancelAttendance}>
        <ListItemIcon sx={{ boxShadow: 'none' }}>
          <Icon sx={{ color: 'grey.900' }} fontSize="small">
            close
          </Icon>
        </ListItemIcon>
        Remover da fila
      </MenuItem>
    </Menu>
  )
}
