import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Button, Icon } from '@mui/material'
import { AttendanceModel, AttendanceStatus } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'
import { State } from '../../../atoms'

type StartAttendanceActionProps = {
  status: AttendanceStatus
  attendanceId: string
}

export const StartAttendanceAction: React.FC<StartAttendanceActionProps> = (props) => {
  const { notify } = useNotify()
  const setAttendancesResult = useSetRecoilState(State.List.attendancesResultState)
  const [loading, setLoading] = React.useState(false)

  const startAttendance = React.useMemo(() => Factories.makeRemoteStartAttendance(), [])

  if (props.status !== 'current') {
    return null
  }

  const onSuccess = (attendanceResult: AttendanceModel) => {
    setAttendancesResult((currentState) => ({
      ...currentState,
      data: currentState.data.map((attendance) => {
        if (attendance.id === attendanceResult.id) {
          return { ...attendance, status: 'attending', startedAt: attendanceResult.startedAt }
        }
        return attendance
      }),
    }))
  }

  const handleStartAttendance = () => {
    setLoading(true)
    startAttendance
      .start({ attendanceId: props.attendanceId })
      .then((result) => {
        if (result.success) {
          onSuccess(result.data)
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
      onClick={handleStartAttendance}
      loading={loading}
      loadingPosition="end"
      color="success"
      size="small"
      sx={{ fontSize: 14, boxShadow: 0 }}
      endIcon={<Icon>content_cut</Icon>}
    >
      INICIAR
    </Button>
  )
}
