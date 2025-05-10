import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Grow, Paper, Skeleton, Slide, Stack, useTheme } from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { Actions, Attendance, Header, StatePanel } from './components'
import { AttendanceModel } from '@/domain/models'
import { useSocket } from '@/presentation/hooks'

export const CurrentAttendance: React.FC = () => {
  const theme = useTheme()
  const company = useRecoilValue(GenericState.companyState)
  const { getSocket } = useSocket()
  const [attendanceResult, setAttendancesResult] = useRecoilState(State.List.attendancesResultState)
  const [success, setSuccess] = useRecoilState(State.List.successState)
  const [closeAttendance, setCloseAttendance] = React.useState(false)
  const [passTheTurn, setPassTheTurn] = React.useState(false)

  const endSuccess = React.useCallback((attendanceId: string) => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setCloseAttendance(true)
      setTimeout(() => {
        setAttendancesResult((currentState) => {
          let pendingsAttendances = currentState.data.filter((attendance) => attendance.id !== attendanceId)
          pendingsAttendances = pendingsAttendances.map((attendance, index) => {
            if (index === 0) {
              return {
                ...attendance,
                status: 'current',
                startedAt: new Date().toISOString(),
              }
            }
            return attendance
          })

          return {
            ...currentState,
            data: pendingsAttendances,
          }
        })
        setCloseAttendance(false)
      }, 700)
    }, 1200)
  }, [])

  const cancelSuccess = React.useCallback((attendanceId: string) => {
    setPassTheTurn(true)
    setTimeout(() => {
      setPassTheTurn(false)
      setCloseAttendance(true)
      setTimeout(() => {
        setAttendancesResult((currentState) => {
          let pendingsAttendances = currentState.data.filter((attendance) => attendance.id !== attendanceId)
          pendingsAttendances = pendingsAttendances.map((attendance, index) => {
            if (index === 0) {
              return {
                ...attendance,
                status: 'current',
                startedAt: new Date().toISOString(),
              }
            }
            return attendance
          })

          return {
            ...currentState,
            data: pendingsAttendances,
          }
        })
        setCloseAttendance(false)
      }, 700)
    }, 1200)
  }, [])

  React.useEffect(() => {
    const socket = getSocket()

    socket.on('entry_in_queue', (attendance: AttendanceModel) => {
      setAttendancesResult((currentState) => ({
        ...currentState,
        data: currentState.data.length ? [...currentState.data, attendance] : [{ ...attendance, status: 'current' }],
      }))
    })

    socket.on('finish_attendance', (attendance: AttendanceModel) => {
      endSuccess(attendance.id)
    })

    socket.on('start_attendance', (attendance: AttendanceModel) => {
      setAttendancesResult(currentState => ({
        ...currentState,
        data: currentState.data.map(item => item.id === attendance.id ? attendance : item),
      }))
    })

    socket.on('disconnect', () => {
      // onLoadAttendancesInfoToday()
    })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  const statusPanel = React.useMemo(() => {
    if (success) {
      return 'success'
    }

    if (passTheTurn) {
      return 'success'
    }

    return 'default'
  }, [success, passTheTurn]) as 'cancel' | 'success' | 'default'


  if (!company) {
    return <Skeleton variant="rounded" width="100%" height={157} sx={{ borderRadius: 2, mt: 1 }} />
  }

  const currentAttendance = attendanceResult?.data?.at(0)

  const bgStatusColor: string = {
    in_queue: `${theme.palette.grey[400]}20`,
    current: `${theme.palette.grey[400]}20`,
    attending: `${theme.palette.success.light}30`,
    finished: `${theme.palette.success.light}20`,
    canceled: `${theme.palette.error.light}20`,
  }[currentAttendance?.status || 'in_queue']

  const statusColor: any = {
    in_queue: 'info',
    current: 'info',
    attending: 'success',
    finished: 'success',
    canceled: 'error',
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
          backgroundColor: (theme) => (success ? `${theme.palette.success.main}90` : bgStatusColor),
          transition: 'all 0.5s ease',
          borderColor: `${statusColor}.light`,
          position: 'relative',
        }}
      >
        <StatePanel variant={statusPanel} />

        <Slide direction={closeAttendance ? 'left' : 'up'} in={!closeAttendance} timeout={100}>
          <Stack>
            <Header startDate={currentAttendance?.startedAt} status={currentAttendance?.status} />

            <Attendance attendance={currentAttendance} />

            <Actions attendance={currentAttendance} endSuccess={endSuccess} cancelSuccess={cancelSuccess} />
          </Stack>
        </Slide>
      </Paper>
    </Grow>
  )
}
