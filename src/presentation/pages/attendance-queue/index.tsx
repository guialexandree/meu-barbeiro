import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { PageContainer } from '@/presentation/components'
import { AttendanceQueueList, CurrentAttendance, HistoryToday, OpenFormAction, StatusSwitch } from './components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'

const AttendanceQueuePage: React.FC = () => {
  const setAttendancesResult = useSetRecoilState(State.List.attendancesResultState)

  const updateCurrentAttendance = React.useCallback((attendances: AttendanceModel[]): AttendanceModel[] => {
    return attendances.map((attendance, index) => {
      if (index === 0) {
        return {
          ...attendance,
          status: 'current',
          startedAt: new Date().toISOString(),
        }
      }
      return attendance
    })
  }, [])

  const onCloseAttendance = React.useCallback((attendanceId: string) => {
    setAttendancesResult((currentState) => {
      let pendingsAttendances = currentState.data.filter((attendance) => attendance.id !== attendanceId)
      pendingsAttendances = updateCurrentAttendance(pendingsAttendances)

      return {
        ...currentState,
        data: pendingsAttendances,
      }
    })
  }, [])

  return (
    <PageContainer>
      <Stack sx={{ px: 2 }} spacing={2}>
        <StatusSwitch />

        <CurrentAttendance onCloseAttendace={onCloseAttendance} />
        {/* <SummaryToday /> */}
        <HistoryToday />

        <OpenFormAction />
      </Stack>
      <AttendanceQueueList />
    </PageContainer>
  )
}

export default AttendanceQueuePage
