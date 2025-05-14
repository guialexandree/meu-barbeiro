import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Grow, Paper, Skeleton, Slide, Stack, useTheme } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { useActions, useSocket } from '@/presentation/hooks'
import { Actions, Attendance, Header, StatePanel } from './components'

type CurrentAttendanceProps = {
  onCloseAttendace: (attendanceId: string) => void
}

export const CurrentAttendance: React.FC<CurrentAttendanceProps> = (props) => {
  const theme = useTheme()
  const { removeAction, getAction } = useActions()
  const company = useRecoilValue(GenericState.companyState)
  const currentAttendance = useRecoilValue(State.List.currentAttendanceState)
  const { getSocket } = useSocket()
  const [attendanceResult, setAttendancesResult] = useRecoilState(State.List.attendancesResultState)
  const [success, setSuccess] = React.useState(false)
  const [closeAttendance, setCloseAttendance] = React.useState(false)
  const [passTheTurn, setPassTheTurn] = React.useState(false)

  const endSuccess = React.useCallback((attendanceId: string) => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setCloseAttendance(true)
      setTimeout(() => {
        props.onCloseAttendace(attendanceId)
        setCloseAttendance(false)
      }, 500)
    }, 1200)
  }, [])

  const cancelSuccess = React.useCallback((attendanceId: string) => {
    setPassTheTurn(true)
    setTimeout(() => {
      setPassTheTurn(false)
      setCloseAttendance(true)
      setTimeout(() => {
        props.onCloseAttendace(attendanceId)
        setCloseAttendance(false)
      }, 500)
    }, 1200)
  }, [])

  React.useEffect(() => {
    const socket = getSocket()

    socket.on('queue/entry_in_queue', (attendance: AttendanceModel) => {
      const action = getAction(attendance.id, 'inQueue')
      if (action) {
        removeAction(action)
        return
      }

      setAttendancesResult((currentState) => ({
        ...currentState,
        data: currentState.data.length ? [...currentState.data, attendance] : [{ ...attendance, status: 'current' }],
      }))
    })

    socket.on('queue/finish_attendance', (attendance: AttendanceModel) => {
      const action = getAction(attendance.id, 'finished')
      if (action) {
        removeAction(action)
        return
      }

      endSuccess(attendance.id)
    })
    socket.on('queue/cancel_attendance', (attendance: AttendanceModel) => {
      const action = getAction(attendance.id, 'cancel')
      if (action) {
        removeAction(action)
        return
      }

      cancelSuccess(attendance.id)
    })

    socket.on('queue/start_attendance', (attendance: AttendanceModel) => {
      setAttendancesResult((currentState) => ({
        ...currentState,
        data: currentState.data.map((item) => (item.id === attendance.id ? attendance : item)),
      }))
    })

    return () => {
      socket.off('queue/entry_in_queue')
      socket.off('queue/finish_attendance')
      socket.off('queue/cancel_attendance')
      socket.off('queue/start_attendance')
    }
  }, [])

  const colorStatus = React.useMemo(() => {
    if (success || attendanceResult?.data?.at(0)?.status === 'attending') {
      return 'success'
    }

    return 'primary'
  }, [attendanceResult, success]) as 'primary' | 'success'

  if (!company) {
    return <Skeleton variant="rounded" width="100%" height={157} sx={{ borderRadius: 2, mt: 1 }} />
  }

  const bgStatusColor: string = {
    in_queue: `${theme.palette.grey[400]}20`,
    current: `${theme.palette.grey[400]}20`,
    attending: `${theme.palette.success.light}30`,
    finished: `${theme.palette.success.light}20`,
    canceled: `${theme.palette.error.light}20`,
  }[currentAttendance?.status || 'in_queue']

  return (
    <Grow
      in={!!attendanceResult?.data?.length}
      timeout={{
        enter: 200,
        exit: 200,
      }}
      unmountOnExit
    >
      <Paper
        variant="outlined"
        sx={{
          px: 1,
          py: 1,
          mt: 1,
          height: 157,
          backgroundColor: (theme) => (success || passTheTurn ? `${theme.palette[colorStatus].main}90` : bgStatusColor),
          transition: 'all 0.5s ease',
          borderColor: `${colorStatus}.light`,
          position: 'relative',
        }}
      >
        {passTheTurn && <StatePanel variant={'cancel'} />}
        {success && <StatePanel variant={'success'} />}

        <Slide direction={closeAttendance ? 'left' : 'up'} in={!closeAttendance} timeout={100}>
          <Stack>
            <Header attendanceId={currentAttendance?.id} startDate={currentAttendance?.startedAt} status={currentAttendance?.status} endSuccess={endSuccess} cancelSuccess={cancelSuccess} />

            <Attendance attendance={currentAttendance} />

            <Actions attendance={currentAttendance} endSuccess={endSuccess} cancelSuccess={cancelSuccess} sendTo={cancelSuccess} />
          </Stack>
        </Slide>
      </Paper>
    </Grow>
  )
}
