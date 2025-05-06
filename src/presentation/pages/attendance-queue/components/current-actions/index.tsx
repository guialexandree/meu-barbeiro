import React from 'react'
import { useRecoilValue } from 'recoil'
import { Stack } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { GenericState } from '@/presentation/components/atoms'
import { StartAttendanceAction } from '../start-attendance-action'
import { EndAttendanceAction } from '../end-attendance-action'
import { CancelAttendanceAction } from '../cancel-attendance-action'

type CurrentActions = {
  attendance: AttendanceModel | undefined
  endSuccess: (attendanceId: string) => void
  cancelSuccess: (attendanceId: string) => void
}

export const CurrentActions: React.FC<CurrentActions> = (props) => {
  const company = useRecoilValue(GenericState.companyState)

  if (company?.statusAttendance !== 'serving' || !props.attendance) {
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
