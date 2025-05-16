import React from 'react'
import { Chip, Grow, Icon, IconButton, Stack, Typography } from '@mui/material'
import { AttendanceModel, AttendanceStatus } from '@/domain/models'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { GenericState } from '@/presentation/components/atoms'
import { MenuActions } from '../menu-actions'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { PanelStatusType } from '../..'

type HeaderProps = {
  attendance: AttendanceModel
  status: AttendanceStatus | undefined
  startDate: string | null
  setPanelStatus: (attendanceId: string, status: PanelStatusType) => Promise<void>
}

export const Header: React.FC<HeaderProps> = (props) => {
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)
  const setLoading = useSetRecoilState(State.loadingActionState)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  if (!props.status) {
    return null
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const statusLabel = {
    in_queue: 'NA VEZ',
    current: 'NA VEZ',
    attending: 'EM ATENDIMENTO',
    finished: 'FINALIZADO',
    canceled: 'CANCELADO',
  }[props.status || 'in_queue']

  const statusColor: any = {
    in_queue: 'info',
    current: 'info',
    attending: 'success',
    finished: 'success',
    canceled: 'error',
  }[props.status || 'in_queue']

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
      {props.startDate && (
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5} sx={{ flex: 1 }}>
          <Icon fontSize="small" sx={{ color: 'grey.500' }}>
            access_time
          </Icon>
          <Typography variant="caption" fontSize={12} fontFamily="Inter" sx={{ color: 'grey.500', fontWeight: 500 }}>
            INICIOU {dateAdapter.format(props.startDate!, 'HH:mm')}
          </Typography>
        </Stack>
      )}

      {/* <IconButton
        size="small"
        aria-controls={open ? 'menu-actions-header' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon fontSize="small">more_vert</Icon>
      </IconButton> */}

      <MenuActions
        anchorOrigin={{
          horizontal: 'left',
          vertical: 30,
        }}
        id="menu-actions-header"
        anchorEl={anchorEl}
        onClose={handleClose}
        attendance={props.attendance}
        setPanelStatus={props.setPanelStatus}
        setLoading={(loading) => { setLoading(loading) }}
      />
    </Stack>
  )
}
