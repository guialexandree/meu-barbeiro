import React from 'react'
import { useRecoilValue } from 'recoil'
import { Button, Icon, Typography } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { Timer } from '@/presentation/components'
import { useNotify } from '@/presentation/hooks'
import { State } from '../atoms'

type EndAttendanceActionProps = {
  status: AttendanceStatus
  attendanceId: string
  startDate: Date
  onSuccess: (attendanceId: string) => void
}

export const EndAttendanceAction: React.FC<EndAttendanceActionProps> = (props) => {
  const { notify } = useNotify()
  const success = useRecoilValue(State.List.successState)
  const [loading, setLoading] = React.useState(false)

  const endAttendance = React.useMemo(() => Factories.makeRemoteEndAttendance(), [])

  if (props.status !== 'attending') {
    return null
  }

  const handleEndAttendance = () => {
    setLoading(true)
    endAttendance
      .end({ attendanceId: props.attendanceId })
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
    <Button
      variant="contained"
      disableElevation
      onClick={handleEndAttendance}
      loading={loading}
      loadingPosition="end"
      disabled={success}
      color="success"
      size="small"
      sx={{ fontSize: 13, boxShadow: 0, fontWeight: '600' }}
      endIcon={<Icon>done_outlined</Icon>}
    >
      {success ? 'FINALIZADO' : 'FINALIZAR'}
      {props.startDate && (
        <Typography variant="caption" fontSize={12} fontFamily="Inter" ml={0.5} sx={{ minWidth: 46 }}>
          (<Timer play={!success} startDate={new Date(props.startDate)} />)
        </Typography>
      )}
    </Button>
  )
}
