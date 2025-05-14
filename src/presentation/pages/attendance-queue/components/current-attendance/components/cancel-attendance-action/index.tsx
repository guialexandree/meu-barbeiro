import React from 'react'
import { useRecoilState } from 'recoil'
import { Button, Grow, Icon } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { MenuActions } from '../menu-actions'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'

type CancelAttendanceActionProps = {
  status: AttendanceStatus
  attendanceId: string
  onSuccess: (attendanceId: string) => void
}

export const CancelAttendanceAction: React.FC<CancelAttendanceActionProps> = (props) => {
  const [loading, setLoading] = useRecoilState(State.loadingActionState)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  if (props.status !== 'current') {
    return null
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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

      <MenuActions
        anchorOrigin={{ horizontal: -40, vertical: 36 }}
        id="menu-actions"
        anchorEl={anchorEl}
        attendanceId={props.attendanceId}
        endSuccess={props.onSuccess}
        cancelSuccess={props.onSuccess}
        setLoading={(loading) => { setLoading(loading) }}
        onClose={handleClose}
      />
    </>
  )
}
