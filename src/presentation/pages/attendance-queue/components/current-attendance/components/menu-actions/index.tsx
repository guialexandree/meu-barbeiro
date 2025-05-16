import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Box, Icon, IconButton, ListItemIcon, MenuItem } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { AttendanceModel } from '@/domain/models'
import { useNotify } from '@/presentation/hooks'
import { Menu } from '@/presentation/components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { State as TemplateState } from '@/presentation/templates/admin-template/components/atoms'
import { PanelStatusType } from '../..'

type MenuActionsProps = {
  attendance: AttendanceModel
  setPanelStatus: (attendanceId: string, status: PanelStatusType) => Promise<void>
}

export const MenuActions: React.FC<MenuActionsProps> = (props) => {
  const { notify } = useNotify()
  const setInfoResult = useSetRecoilState(TemplateState.attendancesInfoResultState)
  const setHistory = useSetRecoilState(State.History.doneAttendancesState)
  const setAttendances = useSetRecoilState(State.List.attendancesResultState)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const cancelAttendance = React.useMemo(() => Factories.makeRemoteCancelAttendance(), [])
  const reAddAttendanceInQueue = React.useMemo(() => Factories.makeRemoteReAddAttendanceInQueue(), [])

  const onSuccess = async (attendance: AttendanceModel, status: PanelStatusType) => {
    await props.setPanelStatus(attendance.id, status)
    setAttendances(currentState => ({
      ...currentState,
      data: [...currentState.data, attendance]
    }))
    setHistory((currentState) => [
      {
        ...props.attendance,
        status: 'canceled',
        timeService: 0,
        finishedAt: new Date().toISOString(),
        amount: 0,
        canceledAt: new Date().toISOString(),
        startedAt: null,
      },
      ...currentState,
    ])
  }

  const handleAddAttendanceInQueue = async () => {
    setAnchorEl(null)
    return reAddAttendanceInQueue
      .reAdd({
        position: 'last',
        id: props.attendance.id,
      })
      .then((result) => {
        if (result.success) {
          onSuccess(result.data, 'reentry')
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch((error) => {
        notify(error, { type: 'error' })
      })
      .finally(() => {
      })
  }

  const handleCancelAttendance = async () => {
    setAnchorEl(null)
    return cancelAttendance
      .cancel({ attendanceId: props.attendance.id, reason: 'PERDEU A VEZ' })
      .then((result) => {
        if (result.success) {
          setInfoResult((currentState) => ({ ...currentState, inQueue: currentState.inQueue - 1 }))
          onSuccess(props.attendance, 'cancelling')
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch((error) => {
        notify(error, { type: 'error' })
      })
      .finally(() => {
      })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
      <IconButton
        size="small"
        aria-controls={open ? "menu-actions-header" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon fontSize="small">more_vert</Icon>
      </IconButton>
      <Menu anchorOrigin={{
          horizontal: 'left',
          vertical: 30,
        }} id={"menu-actions-header"} anchorEl={anchorEl} onClose={() => { setAnchorEl(null) }}>
        <MenuItem onClick={handleAddAttendanceInQueue}>
          <ListItemIcon>
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
    </Box>
  )
}
