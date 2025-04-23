import React from 'react'
import { useRecoilValue } from 'recoil'
import { Avatar, Button, Chip, Icon, IconButton, Paper, Stack, Typography } from '@mui/material'
import { State } from '@/presentation/pages/user-list/components/atoms'

type AttendaceStatus = 'current' | 'attending' | 'finished' | 'canceled'

export const CurrentAttendance: React.FC = () => {
  const clientsResult = useRecoilValue(State.List.usersResultState)
  const [status] = React.useState<AttendaceStatus>('attending')
  const currentClient = clientsResult?.data?.at(0)

  const statusLabel = {
    current: 'NA VEZ',
    attending: 'EM ATENDIMENTO',
    finished: 'FINALIZADO',
    canceled: 'CANCELADO',
  }[status]

  const statusColor: any = {
    current: 'info',
    attending: 'success',
    finished: 'info',
    canceled: 'error',
  }[status]

  return (
    <Paper
      variant="outlined"
      sx={{ px: 1, py: 1, mx: 2, mt: 1, backgroundColor: (theme) => `${theme.palette[statusColor].light}20` }}
      elevation={0}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
        <Chip
          variant="filled"
          color={statusColor}
          label={statusLabel}
          size="small"
          sx={{ fontSize: 14, fontWeight: 900, color: '#fff', letterSpacing: 1 }}
        />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            label="22:06"
            size="small"
            sx={{ minWidth: 74 }}
            onDelete={() => {}}
            deleteIcon={<Icon fontSize="small">alarm</Icon>}
          />
        </Stack>
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
            backgroundColor: 'grey.900',
            border: '3px solid',
            borderColor: `${statusColor}.light`,
          }}
          src={`/public/img/avataaars${Math.floor(Math.random() * 8) + 1}.svg`}
        />

        <Stack sx={{ flex: 1 }}>
          <Typography variant="h6" lineHeight={1} fontSize={16} fontFamily="Inter" textTransform="uppercase">
            {currentClient?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
            CORTE + HIDRATAÇÃO
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} mt={1}>
        <IconButton>
          <Icon>close</Icon>
        </IconButton>

        {status === 'current' && (
          <Button
            fullWidth
            variant="contained"
            disableElevation
            color="success"
            size="small"
            sx={{ fontSize: 14, boxShadow: 0 }}
            endIcon={<Icon>content_cut</Icon>}
          >
            INICIAR
          </Button>
        )}
        {status === 'attending' && (
          <Button
            fullWidth
            variant="contained"
            disableElevation
            color="success"
            size="small"
            sx={{ fontSize: 14, boxShadow: 0 }}
            endIcon={<Icon>check</Icon>}
          >
            FINALIZAR
          </Button>
        )}

        <IconButton>
          <Icon>more_vert</Icon>
        </IconButton>
      </Stack>
    </Paper>
  )
}
