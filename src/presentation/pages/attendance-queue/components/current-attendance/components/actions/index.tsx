import React from 'react'
import { Stack } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { StartAttendanceAction, EndAttendanceAction, CancelAttendanceAction, PanelStatusType } from '@/presentation/pages/attendance-queue/components'

type Actions = {
  attendance: AttendanceModel | undefined
  setPanelStatus: (attendanceId: string, status: PanelStatusType) => void
}

export const Actions: React.FC<Actions> = (props) => {
  if (!props.attendance) {
    return null
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: '100%' }} mt={1} spacing={2}>
      <CancelAttendanceAction
        attendance={props.attendance}
        onSuccess={attendanceId => {
          props.setPanelStatus(attendanceId, 'reentry')
        }}
        hide={props.attendance.status !== 'current'}
      />

      <StartAttendanceAction
        hide={props.attendance.status !== 'current'}
        attendanceId={props.attendance.id}
      />

      <EndAttendanceAction
        onSuccess={attendanceId => {
          props.setPanelStatus(attendanceId, 'ending')
        }}
        startDate={props.attendance.startedAt!}
        hide={props.attendance.status !== 'attending'}
        attendanceId={props.attendance.id}
        amount={props.attendance.services?.reduce((acc, service) => acc + +service.price, 0)}
      />
    </Stack>
  )
}
