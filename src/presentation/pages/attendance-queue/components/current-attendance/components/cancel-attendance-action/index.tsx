import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Button, Grow, Icon } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { State as TemplateState } from '@/presentation/templates/admin-template/components/atoms'
import { AttendanceModel } from '@/domain/models'

type CancelAttendanceActionProps = {
  attendance: AttendanceModel
  onSuccess: (attendanceId: string) => void
  hide?: boolean
}

export const CancelAttendanceAction: React.FC<CancelAttendanceActionProps> = (props) => {
  const { notify } = useNotify()
  const [loading, setLoading] = useRecoilState(State.loadingActionState)
  const setInfoResult = useSetRecoilState(TemplateState.attendancesInfoResultState)
  const setHistory = useSetRecoilState(State.History.doneAttendancesState)

  const cancelAttendance = React.useMemo(() => Factories.makeRemoteCancelAttendance(), [])

  if (props.hide) {
    return null
  }

  const onSuccess = (attendance: AttendanceModel) => {
    setHistory(currentState => [
      {
        id: attendance.id,
        status: 'canceled',
        timeService: 0,
        finishedAt: new Date().toISOString(),
        amount: 0,
        canceledAt: new Date().toISOString(),
        startedAt: null,
        user: props.attendance.user
      },
      ...currentState,
    ])
    setInfoResult(currentState => ({ ...currentState, inQueue: currentState.inQueue - 1 }))
    props.onSuccess(attendance.id)
  }

  const handleCancelAttendance = async () => {
    setLoading(true)
    return cancelAttendance
      .cancel({ attendanceId: props.attendance.id, reason: 'PERDEU A VEZ' })
      .then((result) => {
        if (result.success) {
          onSuccess(result.data)
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
