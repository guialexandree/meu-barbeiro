import React from 'react'
import { PageContainer } from '@/presentation/components'
import { AttendanceQueueList, CurrentAttendance, HistoryToday, OpenFormAction, StatusSwitch } from './components'
import { AttendancesGraphPanel } from '../financial/components'
import { Stack } from '@mui/material'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <Stack mx={2}>
        <StatusSwitch />

        <HistoryToday />
        <CurrentAttendance />
        <AttendanceQueueList />

        <AttendancesGraphPanel />

        <OpenFormAction />
      </Stack>
    </PageContainer>
  )
}

export default AttendanceQueuePage
