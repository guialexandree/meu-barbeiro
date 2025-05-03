import React from 'react'
import { PageContainer } from '@/presentation/components'
import {
  AttendanceQueueList,
  CurrentAttendance,
  HistoryToday,
  OpenFormAction,
  StatusSwitch,
} from './components'
import { Box, Stack, Zoom } from '@mui/material'
import logoImg from '@/presentation/assets/logo.png'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <Stack sx={{ px: 2}} spacing={2}>
        <StatusSwitch />

        <CurrentAttendance />
        {/* <SummaryToday /> */}
        <HistoryToday />

        <OpenFormAction />
      </Stack>
      <AttendanceQueueList />

      <Zoom timeout={400} in>
        <Stack width='100%' alignItems='center' justifyContent='center' spacing={1} sx={{ position: 'fixed', bottom: 48, right: 0, p: 2, zIndex: 1, height: '35vh', opacity: 0.2 }}>
          <Box
            src={logoImg}
            component={'img'}
            sx={{ p: 2, height: '100%' }}
          />
        </Stack>
      </Zoom>
    </PageContainer>
  )
}

export default AttendanceQueuePage
