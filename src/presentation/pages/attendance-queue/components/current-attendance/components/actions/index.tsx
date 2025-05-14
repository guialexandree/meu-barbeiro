import React from 'react'
import { Stack } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { StartAttendanceAction, EndAttendanceAction, CancelAttendanceAction } from '@/presentation/pages/attendance-queue/components'

type Actions = {
  attendance: AttendanceModel | undefined
  endSuccess: (attendanceId: string) => void
  cancelSuccess: (attendanceId: string) => void
  sendTo: (attendanceId: string) => void
}

export const Actions: React.FC<Actions> = (props) => {
  if (!props.attendance) {
    return null
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: '100%' }} mt={1} spacing={2}>
      <CancelAttendanceAction
        attendanceId={props.attendance.id}
        onSuccess={props.cancelSuccess}
        status={props.attendance.status}
      />

      <StartAttendanceAction status={props.attendance.status} attendanceId={props.attendance.id} />

      <EndAttendanceAction
        onSuccess={props.endSuccess}
        startDate={props.attendance.startedAt!}
        status={props.attendance.status}
        attendanceId={props.attendance.id}
      />
    </Stack>
  )
}
