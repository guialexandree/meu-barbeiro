import React from 'react'
import { useRecoilValue } from 'recoil'
import { Button, Chip, Icon, Stack, Typography } from '@mui/material'
import { GenericState } from '@/presentation/components/atoms'

type AttendaceStatus = 'current' | 'attending' | 'finished' | 'canceled'

export const CurrentActions: React.FC = () => {
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)
  const company = useRecoilValue(GenericState.companyState)
  const [status] = React.useState<AttendaceStatus>('current')

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
          sx={{ borderRadius: 8 }}
          icon={<Icon>alarm_on</Icon>}
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

      {status === 'current' && (
        <Button
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
          variant="contained"
          disableElevation
          color="success"
          size="small"
          sx={{ fontSize: 14, boxShadow: 0 }}
          endIcon={<Icon>done_outlined</Icon>}
        >
          FINALIZAR
          <Typography variant="caption" fontSize={12} fontFamily="Inter" ml={0.5}>
            (14:50)
          </Typography>
        </Button>
      )}
    </Stack>
  )
}
