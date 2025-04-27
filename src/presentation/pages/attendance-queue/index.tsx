import React from 'react'
import { PageContainer } from '@/presentation/components'
import { AttendanceQueueList, CurrentAttendance, OpenFormAction, StatusSwitch } from './components'
import { AttendancesGraphPanel } from '../financial/components'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <StatusSwitch />

      <AttendancesGraphPanel />
      <CurrentAttendance />

      <AttendanceQueueList onReload={() => {}} />

      <OpenFormAction />
    </PageContainer>
  )
}

export default AttendanceQueuePage
