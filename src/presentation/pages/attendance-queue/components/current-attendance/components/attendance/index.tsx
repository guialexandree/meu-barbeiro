import React from 'react'
import { Avatar, Stack, Typography, useTheme, Zoom } from '@mui/material'
import { imgRandom } from '@/presentation/components/avatar-random'
import { AttendanceModel } from '@/domain/models'

type AttendanceProps = {
  attendance: AttendanceModel | undefined
}

export const Attendance: React.FC<AttendanceProps> = (props) => {
  const theme = useTheme()
  const avatar = React.useMemo(() => imgRandom[Math.floor(Math.random() * imgRandom.length)], [])

  if (!props.attendance) {
    return null
  }

  const bgStatusColor: string = {
    in_queue: `${theme.palette.grey[400]}20`,
    current: `${theme.palette.grey[400]}20`,
    attending: `${theme.palette.success.light}30`,
    finished: `${theme.palette.success.light}20`,
    canceled: `${theme.palette.error.light}20`,
  }[props.attendance.status]

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      sx={{ width: '100%' }}
      mt={1}
      spacing={1}
    >
      <Zoom in>
        <Avatar
          alt="Remy Sharp"
          sx={{
            mt: 1,
            width: 60,
            height: 60,
            backgroundColor: 'background.default',
            border: '3px solid',
            borderColor: `${bgStatusColor}.light`,
          }}
          src={avatar}
        />
      </Zoom>

      <Stack sx={{ flex: 1 }} spacing={0.5}>
        <Typography variant="h6" lineHeight={1} fontSize={16} fontFamily="Inter" textTransform="uppercase">
          {props.attendance.user.name}
        </Typography>
        <Typography variant="body2" color="text.disabled" fontSize={11} fontFamily="Inter">
          {props.attendance.services
            .map((attendanceService) => attendanceService.service.name.toUpperCase())
            .join(' + ')}
        </Typography>
      </Stack>
    </Stack>
  )
}
