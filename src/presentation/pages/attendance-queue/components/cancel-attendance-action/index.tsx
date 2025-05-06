import React from 'react'
import { Button, Grow, Icon } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'

type CancelAttendanceActionProps = {
  status: AttendanceStatus
  attendanceId: string
  onSuccess: (attendanceId: string) => void
}

export const CancelAttendanceAction: React.FC<CancelAttendanceActionProps> = (props) => {
  const { notify } = useNotify()
  const [loading, setLoading] = React.useState(false)

  const cancelAttendance = React.useMemo(() => Factories.makeRemoteCancelAttendance(), [])

  if (props.status !== 'current') {
    return null
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
      })
  }

  return (
    <Grow in>
      <Button
        variant="outlined"
        disableElevation
        onClick={handleCancelAttendance}
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
  )
}
