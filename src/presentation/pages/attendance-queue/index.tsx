import React from 'react'
import { PageContainer } from '@/presentation/components'
import { AttendanceQueueList, CurrentAttendance, OpenFormAction, StatusSwitch } from './components'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <StatusSwitch />

      <CurrentAttendance />

      <AttendanceQueueList onReload={() => {}} />

      <OpenFormAction />
    </PageContainer>
  )
}

export default AttendanceQueuePage
