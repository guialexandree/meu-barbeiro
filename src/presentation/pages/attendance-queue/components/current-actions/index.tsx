import React from 'react'
import { useRecoilValue } from 'recoil'
import { Chip, Icon, Stack } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { GenericState } from '@/presentation/components/atoms'
import { StartAttendanceAction } from '../start-attendance-action'
import { EndAttendanceAction } from '../end-attendance-action'

type CurrentActions = {
  status: AttendanceStatus
  attendanceId: string
}

export const CurrentActions: React.FC<CurrentActions> = (props) => {
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)
  const company = useRecoilValue(GenericState.companyState)
  const [status] = React.useState<AttendanceStatus>('current')

  if (company?.statusAttendance !== 'serving') {
    return null
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: '100%' }}
      mt={1}
      spacing={0.5}
    >
      {status === 'current' && (
        <Chip
          sx={{ borderRadius: 8, fontSize: 12 }}
          icon={<Icon fontSize='small'>alarm_on</Icon>}
          label={`tempo previsto ${dateAdapter.format('2025-05-20 09:23:222', 'HH:MM')}`}
        />
      )}
      {status === 'attending' && (
        <Chip
          sx={{ borderRadius: 8 }}
          icon={<Icon>alarm_on</Icon>}
          label={`início ${dateAdapter.format('2025-05-20 09:23:222', 'HH:MM:ss')}`}
        />
      )}

      <StartAttendanceAction status={props.status} attendanceId={props.attendanceId} />

      <EndAttendanceAction status={props.status} attendanceId={props.attendanceId} />
    </Stack>
  )
}
