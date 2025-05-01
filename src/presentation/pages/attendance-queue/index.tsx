import React from 'react'
import { PageContainer } from '@/presentation/components'
import { AttendanceQueueList, CurrentAttendance, HistoryToday, OpenFormAction, StatusSwitch, SummaryToday } from './components'
import { Stack } from '@mui/material'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <Stack mx={2}>
        <StatusSwitch />

        <HistoryToday />
        <CurrentAttendance />
        <AttendanceQueueList />
        <SummaryToday />

        <OpenFormAction />
      </Stack>
    </PageContainer>
  )
}

export default AttendanceQueuePage
