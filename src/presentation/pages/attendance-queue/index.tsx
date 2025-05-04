import React from 'react'
import { PageContainer } from '@/presentation/components'
import { AttendanceQueueList, CurrentAttendance, HistoryToday, OpenFormAction, StatusSwitch } from './components'
import { Stack } from '@mui/material'

const AttendanceQueuePage: React.FC = () => {
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
