import React from 'react'
import { PageContainer } from '@/presentation/components'
import {
  AttendanceQueueList,
  CurrentAttendance,
  HistoryToday,
  OpenFormAction,
  StatusSwitch,
  SummaryToday,
} from './components'
import { Stack } from '@mui/material'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <Stack sx={{ px: 2 }}>
        <StatusSwitch />

        <HistoryToday />
        <CurrentAttendance />
        <SummaryToday />

        <OpenFormAction />
      </Stack>
      <AttendanceQueueList />
    </PageContainer>
  )
}

export default AttendanceQueuePage
