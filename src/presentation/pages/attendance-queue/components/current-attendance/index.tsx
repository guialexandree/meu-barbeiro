import React from 'react'
import { useRecoilValue } from 'recoil'
import { Avatar, Chip, Icon, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { CurrentActions } from '../current-actions'
import { getRandomAvatar } from '@/presentation/components/avatar-random'

export const CurrentAttendance: React.FC = () => {
  const theme = useTheme()
  const attendanceResult = useRecoilValue(State.List.attendancesResultState)
  const company = useRecoilValue(GenericState.companyState)

  if (company?.statusAttendance !== 'serving' || !attendanceResult?.data?.length) {
    return null
  }

  const currentAttendance = attendanceResult.data.at(0)!

  const statusLabel = {
    in_queue: 'NA VEZ',
    current: 'NA VEZ',
    attending: 'EM ATENDIMENTO',
    finished: 'FINALIZADO',
    canceled: 'CANCELADO',
  }[currentAttendance.status]

  const bgStatusColor: string = {
    in_queue: `${theme.palette.grey[400]}20`,
    current: `${theme.palette.grey[400]}20`,
    attending: `${theme.palette.success.light}20`,
    finished: `${theme.palette.success.light}20`,
    canceled: `${theme.palette.error.light}20`,
  }[currentAttendance.status]

  const statusColor: any = {
    in_queue: 'info',
    current: 'info',
    attending: 'success',
    finished: 'success',
    canceled: 'error',
  }[currentAttendance.status]

  return (
    <Paper variant="outlined" sx={{ px: 1, py: 1, mt: 1, backgroundColor: bgStatusColor }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
        <Chip
          variant="filled"
          color={statusColor}
          label={statusLabel}
          size="small"
          sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 1 }}
        />
        <IconButton size="small">
          <Icon fontSize="small">more_vert</Icon>
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ width: '100%' }}
        mt={1}
        spacing={1}
      >
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
          src={getRandomAvatar()}
        />

        <Stack sx={{ flex: 1 }}>
          <Typography variant="h6" lineHeight={1} fontSize={16} fontFamily="Inter" textTransform="uppercase">
            {currentAttendance.user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
            {currentAttendance.services.map((attendanceService) => attendanceService.service.description.toUpperCase()).join(' + ')}
          </Typography>
        </Stack>
      </Stack>

      <CurrentActions />
    </Paper>
  )
}
