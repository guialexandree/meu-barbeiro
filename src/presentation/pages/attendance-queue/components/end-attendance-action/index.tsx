import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Button, Icon, Typography } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'
import { State } from '../atoms'

type EndAttendanceActionProps = {
  status: AttendanceStatus
  attendanceId: string
}

export const EndAttendanceAction: React.FC<EndAttendanceActionProps> = (props) => {
  const { notify } = useNotify()
  const setAttendancesResult = useSetRecoilState(State.List.attendancesResultState)
  const [loading, setLoading] = React.useState(false)

  const endAttendance = React.useMemo(() => Factories.makeRemoteEndAttendance(), [])

  if (props.status !== 'attending') {
    return null
  }

  const onSuccess = () => {
    setAttendancesResult((currentState) => ({
      ...currentState,
      data: currentState.data.filter((attendance) => attendance.id !== props.attendanceId),
    }))
  }

  const handleEndAttendance = () => {
    setLoading(true)
    endAttendance
      .end({ attendanceId: props.attendanceId })
      .then((result) => {
        if (result.success) {
          onSuccess()
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
    <Button
      variant="contained"
      disableElevation
      onClick={handleEndAttendance}
      loading={loading}
      loadingPosition="end"
      color="success"
      size="small"
      sx={{ fontSize: 13, boxShadow: 0, fontWeight: '600' }}
      endIcon={<Icon>done_outlined</Icon>}
    >
      FINALIZAR
      <Typography variant="caption" fontSize={12} fontFamily="Inter" ml={0.5}>
        (14:50)
      </Typography>
    </Button>
  )
}
