import React from 'react'
import { Button, Typography } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { Timer } from '@/presentation/components'
import { useNotify } from '@/presentation/hooks'
import { State as TemplateState } from '@/presentation/templates/admin-template/components/atoms'
import { useSetRecoilState } from 'recoil'

type EndAttendanceActionProps = {
  attendanceId: string
  startDate: string
  onSuccess: (attendanceId: string) => void
  amount: number
  hide?: boolean
}

export const EndAttendanceAction: React.FC<EndAttendanceActionProps> = (props) => {
  const { notify } = useNotify()
  const [loading, setLoading] = React.useState(false)
  const setInfoResult = useSetRecoilState(TemplateState.attendancesInfoResultState)

  const endAttendance = React.useMemo(() => Factories.makeRemoteEndAttendance(), [])

  if (props.hide) {
    return null
  }

  const onSuccess = (attendanceId: string) => {
    setInfoResult((currentState) => ({
      ...currentState,
      inQueue: currentState.inQueue - 1,
      finished: currentState.finished + 1,
      amount: currentState.amount + props.amount
    }))
    props.onSuccess(attendanceId)
  }

  const handleEndAttendance = async () => {
    setLoading(true)
    return endAttendance
      .end({ attendanceId: props.attendanceId })
      .then((result) => {
        if (result.success) {
          onSuccess(props.attendanceId)
          return
        }

        notify(result.error, { type: 'error' })
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
      sx={{ fontSize: 13, boxShadow: 0, fontWeight: '600', px: 2 }}
    >
      FINALIZAR
      {props.startDate && (
        <Typography variant="caption" fontSize={12} fontFamily="Inter" ml={0.5} sx={{ minWidth: 46 }}>
          (<Timer play startDate={new Date(props.startDate)} />)
        </Typography>
      )}
    </Button>
  )
}
