import React from 'react'
import { useRecoilValue } from 'recoil'
import { Icon, Stack, Typography } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { StartAttendanceAction, EndAttendanceAction, CancelAttendanceAction, PanelStatusType } from '@/presentation/pages/attendance-queue/components'
import { GenericState } from '@/presentation/components/atoms'

type Actions = {
  attendance: AttendanceModel | undefined
  setPanelStatus: (attendanceId: string, status: PanelStatusType) => void
}

export const Actions: React.FC<Actions> = (props) => {
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)

  if (!props.attendance) {
    return null
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: '100%' }} mt={1} spacing={2}>
      {props.attendance.startedAt && (
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ ml: 1 }}>
          <Icon fontSize="small" sx={{ color: 'text.disabled' }}>
            flag
          </Icon>
          <Typography variant="caption" fontSize={11} fontFamily="Inter" sx={{ color: 'text.disabled' }}>
            INICIOU ÀS {dateAdapter.format(props.attendance.startedAt!, 'HH:mm')}
          </Typography>
        </Stack>
      )}

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
