import React from 'react'
import { io, Socket } from 'socket.io-client'
import { Stack } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { AttendanceModel } from '@/domain/models'
import { AttendanceQueueList, CurrentAttendance, HistoryToday, OpenFormAction, StatusSwitch } from './components'
import { State as TemplateState } from '@/presentation/templates/admin-template/components/atoms'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { useSetRecoilState } from 'recoil'

const AttendanceQueuePage: React.FC = () => {
  const setAttendancesInfo = useSetRecoilState(TemplateState.attendancesInfoResultState)
  const setAttendancesResult = useSetRecoilState(State.List.attendancesResultState)

  React.useEffect(() => {
    const socket: Socket = io('https://meubarbeiro.site/attendances', {
      transports: ['websocket'],
    })

    socket.on('add', (attendance: AttendanceModel) => {
      console.log('add', attendance)
      setAttendancesInfo((currentState) => ({
        ...currentState,
        inQueue: currentState.inQueue + 1,
      }))
      setAttendancesResult((currentState) => ({
        ...currentState,
        data: currentState.data.length ? [...currentState.data, attendance] : [{ ...attendance, status: 'current' }],
      }))
    })

    socket.on('disconnect', () => {
      // onLoadAttendancesInfoToday()
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <PageContainer>
      <Stack sx={{ px: 2 }} spacing={2}>
        <StatusSwitch />

        <CurrentAttendance />
        {/* <SummaryToday /> */}
        <HistoryToday />

        <OpenFormAction />
      </Stack>
      <AttendanceQueueList />
    </PageContainer>
  )
}

export default AttendanceQueuePage
