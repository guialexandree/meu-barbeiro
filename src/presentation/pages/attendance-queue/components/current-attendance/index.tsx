import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Avatar,
  Box,
  Chip,
  Icon,
  IconButton,
  Paper,
  Skeleton,
  Slide,
  Stack,
  Typography,
  useTheme,
  Zoom,
} from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { CurrentActions } from '../current-actions'
import { getRandomAvatar } from '@/presentation/components/avatar-random'
import checkMedia from '@/presentation/assets/check.gif'

export const CurrentAttendance: React.FC = () => {
  const theme = useTheme()
  const [attendanceResult, setAttendancesResult] = useRecoilState(State.List.attendancesResultState)
  const company = useRecoilValue(GenericState.companyState)
  const [success, setSuccess] = useRecoilState(State.List.successState)
  const [close, setClose] = React.useState(false)

  const endSuccess = React.useCallback((attendanceId: string) => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setClose(true)
      setTimeout(() => {
        setAttendancesResult((currentState) => {
          let pendingsAttendances = currentState.data.filter((attendance) => attendance.id !== attendanceId)
          pendingsAttendances = pendingsAttendances.map((attendance, index) => {
            if (index === 0) {
              return {
                ...attendance,
                status: 'current',
                startedAt: new Date(),
              }
            }
            return attendance
          })

          return ({
          ...currentState,
          data: pendingsAttendances,
        })})
        setClose(false)
      }, 700)
    }, 1200)
  }, [])

  if (!company) {
    return <Skeleton variant="rounded" width="100%" height={157} sx={{ borderRadius: 2, mt: 1 }} />
  }

  if (company?.statusAttendance !== 'serving' || !attendanceResult?.data?.length) {
    return null
  }

  const currentAttendance = attendanceResult.data.at(0)!

  const statusLabel = {
    in_queue: 'NA VEZ',
    current: 'NA VEZ',
    attending: success ? 'ATENDIMENTO FINALIZADO' : 'EM ATENDIMENTO',
    finished: 'FINALIZADO',
    canceled: 'CANCELADO',
  }[currentAttendance.status]

  const bgStatusColor: string = {
    in_queue: `${theme.palette.grey[400]}20`,
    current: `${theme.palette.grey[400]}20`,
    attending: `${theme.palette.success.light}30`,
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
    <Paper
      variant="outlined"
      sx={{
        px: 1,
        py: 1,
        mt: 1,
        height: 157,
        backgroundColor: (theme) => (success ? `${theme.palette.success.main}90` : bgStatusColor),
        transition: 'all 0.5s ease',
        borderColor: `${statusColor}.light`,
        position: 'relative',
      }}
    >
      {success && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: (theme) => `${theme.palette.success.main}90`,
            zIndex: 1,
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
          }}
        >
          <Zoom in>
            <Box
              sx={{ width: 80, height: 80, objectFit: 'contain' }}
              component="img"
              src={checkMedia}
              alt="icone de check"
            />
          </Zoom>
        </Box>
      )}

      <Slide direction={close ? 'left' : 'up'} in={!close} timeout={100}>
        <Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
            <Zoom in timeout={700} unmountOnExit>
              <Chip
                variant="filled"
                color={statusColor}
                label={statusLabel}
                size="small"
                sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 1 }}
              />
            </Zoom>
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
                src={getRandomAvatar()}
              />
            </Zoom>

            <Stack sx={{ flex: 1 }}>
              <Typography variant="h6" lineHeight={1} fontSize={16} fontFamily="Inter" textTransform="uppercase">
                {currentAttendance.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
                {currentAttendance.services
                  .map((attendanceService) => attendanceService.service.description.toUpperCase())
                  .join(' + ')}
              </Typography>
            </Stack>
          </Stack>

          <CurrentActions
            startDate={currentAttendance.startedAt!}
            attendanceId={currentAttendance.id}
            status={currentAttendance.status}
            endSuccess={endSuccess}
          />
        </Stack>
      </Slide>
    </Paper>
  )
}
