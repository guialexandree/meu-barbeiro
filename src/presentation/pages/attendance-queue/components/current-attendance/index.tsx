import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Grow, Paper, Skeleton, Slide, Stack, useTheme } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { Action } from '@/infra'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { useSocket } from '@/presentation/hooks'
import { Actions, Attendance, Header, PanelStatus } from './components'

export type PanelStatusType = null | 'cancelling' | 'reentry' | 'ending'

export const CurrentAttendance: React.FC = () => {
  const theme = useTheme()
  const company = useRecoilValue(GenericState.companyState)
  const currentAttendance = useRecoilValue(State.List.currentAttendanceState)
  const { getSocket, getActions } = useSocket()
  const [attendanceResult, setAttendancesResult] = useRecoilState(State.List.attendancesResultState)
  const [panelStatus, setPanelStatus] = React.useState<PanelStatusType>(null)
  const [closeAttendance, setCloseAttendance] = React.useState(false)

  const setCurrentAttendance = React.useCallback((attendances: AttendanceModel[]): AttendanceModel[] => {
    return attendances.map((attendance, index) => {
      if (index === 0) {
        return {
          ...attendance,
          status: 'current',
        }
      }
      return attendance
    })
  }, [])

  const onCloseAttendance = React.useCallback((attendanceId: string) => {
    setAttendancesResult((currentState) => {
      let pendingsAttendances = currentState.data.filter((attendance) => attendance.id !== attendanceId)
      pendingsAttendances = setCurrentAttendance(pendingsAttendances)

      return {
        ...currentState,
        data: pendingsAttendances,
      }
    })
  }, [])

  const setStatus = React.useCallback(async (attendanceId: string, status: PanelStatusType) => {
    return await new Promise<void>(resolve => {
      setPanelStatus(status)
      setTimeout(() => {
        setCloseAttendance(true)
        setPanelStatus(null)
        setTimeout(() => {
          onCloseAttendance(attendanceId)
          setCloseAttendance(false)
          resolve()
        }, 700)
      }, 1200)
    })
  }, [])

  React.useEffect(() => {
    // const socket = getSocket()
    // const actions = getActions()

    // socket.on('queue/finish_attendance', (attendance: AttendanceModel) => {
    //   const action: Action = { attendanceId: attendance.id, type: 'finished' }
    //   const hasAction = actions.hasAction(action)
    //   if (hasAction) {
    //     actions.removeAction(action)
    //     return
    //   }

    //   setStatus(attendance.id, 'ending')
    // })

    // socket.on('queue/cancel_attendance', (attendance: AttendanceModel) => {
    //   const action: Action = { attendanceId: attendance.id, type: 'cancel' }
    //   const hasAction = actions.hasAction(action)
    //   if (hasAction) {
    //     actions.removeAction(action)
    //     return
    //   }

    //   setStatus(attendance.id, 'cancelling')
    // })

    // socket.on('queue/start_attendance', (attendance: AttendanceModel) => {
    //   const action: Action = { attendanceId: attendance.id, type: 'start' }
    //   const hasAction = actions.hasAction(action)
    //   if (hasAction) {
    //     actions.removeAction(action)
    //     return
    //   }

    //   setAttendancesResult((currentState) => ({
    //     ...currentState,
    //     data: currentState.data.map((item) => (item.id === attendance.id ? attendance : item)),
    //   }))
    // })

    return () => {
      // socket.off('queue/entry_in_queue')
      // socket.off('queue/finish_attendance')
      // socket.off('queue/cancel_attendance')
      // socket.off('queue/start_attendance')
    }
  }, [])

  if (!company || !attendanceResult) {
    return <Skeleton variant="rounded" width="100%" height={157} sx={{ borderRadius: 2, mt: 1 }} />
  }

  const borderStatusColor: string = {
    in_queue: `${theme.palette.grey[400]}20`,
    current: `${theme.palette.grey[400]}50` ,
    attending: theme.palette.success.main,
    finished: theme.palette.success.main,
    canceled: theme.palette.error.main,
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
          borderRadius: 3,
          backgroundColor:
            currentAttendance?.status === 'attending' ? `${theme.palette.success.main}40` : 'transparent',
          transition: 'all 0.5s ease',
          borderColor: borderStatusColor,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <PanelStatus status={panelStatus} />

        <Slide direction={closeAttendance ? 'left' : 'up'} in={!closeAttendance} timeout={100}>
          <Stack>
            <Header
              attendance={currentAttendance!}
              startDate={currentAttendance?.startedAt}
              status={currentAttendance?.status}
              setPanelStatus={setStatus}
            />

            <Attendance attendance={currentAttendance} />

            <Actions setPanelStatus={setStatus} attendance={currentAttendance} />
          </Stack>
        </Slide>
      </Paper>
    </Grow>
  )
}
