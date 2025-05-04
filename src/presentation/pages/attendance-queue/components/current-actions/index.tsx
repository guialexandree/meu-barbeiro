import React from 'react'
import { useRecoilValue } from 'recoil'
import { Stack } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { GenericState } from '@/presentation/components/atoms'
import { StartAttendanceAction } from '../start-attendance-action'
import { EndAttendanceAction } from '../end-attendance-action'

type CurrentActions = {
  status: AttendanceStatus
  attendanceId: string
  startDate: Date
  success?: boolean
}

export const CurrentActions: React.FC<CurrentActions> = (props) => {
  const company = useRecoilValue(GenericState.companyState)

  if (company?.statusAttendance !== 'serving') {
    return null
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{ width: '100%' }}
      mt={1}
      spacing={0.5}
    >
      <StartAttendanceAction status={props.status} attendanceId={props.attendanceId} />

      <EndAttendanceAction startDate={props.startDate} status={props.status} attendanceId={props.attendanceId} />
    </Stack>
  )
}
