import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Grow, Paper, Skeleton, Slide, Stack, useTheme } from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { CurrentActions } from '../current-actions'
import { Attendance, Header, SuccessPanel } from './components'

export const CurrentAttendance: React.FC = () => {
  const theme = useTheme()
  const [attendanceResult, setAttendancesResult] = useRecoilState(State.List.attendancesResultState)
  const company = useRecoilValue(GenericState.companyState)
  const [success, setSuccess] = useRecoilState(State.List.successState)
  const [closeAttendance, setCloseAttendance] = React.useState(false)

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
        <SuccessPanel success={success} />

        <Slide direction={closeAttendance ? 'left' : 'up'} in={!closeAttendance} timeout={100}>
          <Stack>
            <Header startDate={currentAttendance?.startedAt} status={currentAttendance?.status} />

            <Attendance attendance={currentAttendance} />

            <CurrentActions attendance={currentAttendance} endSuccess={endSuccess} cancelSuccess={endSuccess} />
          </Stack>
        </Slide>
      </Paper>
    </Grow>
  )
}
