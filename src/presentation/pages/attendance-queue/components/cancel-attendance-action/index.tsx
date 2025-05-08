import React from 'react'
import { Button, Grow, Icon, ListItemIcon, MenuItem } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'
import { Menu } from '@/presentation/components'

type CancelAttendanceActionProps = {
  status: AttendanceStatus
  attendanceId: string
  onSuccess: (attendanceId: string) => void
}

export const CancelAttendanceAction: React.FC<CancelAttendanceActionProps> = (props) => {
  const { notify } = useNotify()
  const [loading, setLoading] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const cancelAttendance = React.useMemo(() => Factories.makeRemoteCancelAttendance(), [])

  if (props.status !== 'current') {
    return null
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCancelAttendance = () => {
    setLoading(true)
    cancelAttendance
      .cancel({ attendanceId: props.attendanceId, reason: 'PERDEU A VEZ' })
      .then((result) => {
        if (result.success) {
          props.onSuccess(props.attendanceId)
          return
        }
      })
      .catch((error) => {
        notify(error, { type: 'error' })
      })
      .finally(() => {
        setLoading(false)
        handleClose()
      })
  }

  return (
    <>
      <Grow in>
        <Button
          variant="outlined"
          disableElevation
          onClick={handleClick}
          loading={loading}
          loadingPosition="end"
          color="inherit"
          size="small"
          sx={{ fontSize: 13, boxShadow: 0, fontWeight: '600', borderColor: 'grey.400', color: 'grey.400' }}
          endIcon={<Icon>redo</Icon>}
        >
          PASSAR A VEZ
        </Button>
      </Grow>

      <Menu anchorOrigin={{ horizontal: -40, vertical: 36 }} id="basic-menu" anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleCancelAttendance}>
          <ListItemIcon sx={{ boxShadow: 'none' }}>
            <Icon sx={{ color: 'grey.900' }} fontSize="small">
              close
            </Icon>
          </ListItemIcon>
          Cancelar atendimento
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Icon sx={{ color: 'grey.900' }} fontSize="small">
              south
            </Icon>
          </ListItemIcon>
          Enviar para o final da fila
        </MenuItem>
      </Menu>
    </>
  )
}
