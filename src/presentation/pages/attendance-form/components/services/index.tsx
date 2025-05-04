import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade, Icon, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { ServiceQueueItem } from '../services-queue-item'

export const Services: React.FC = () => {
  const selectedServices = useRecoilValue(State.selectedServicesState)
  const loading = useRecoilValue(State.loadingServicesState)

  return (
    <Fade in mountOnEnter unmountOnExit>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h1">
            SERVIÇOS A REALIZAR
          </Typography>
          <IconButton size="small" color="info" sx={{ backgroundColor: (theme) => `${theme.palette.info.light}20` }}>
            <Icon fontSize="small">add</Icon>
          </IconButton>
        </Stack>

        {loading || !selectedServices.length ? (
          <Skeleton variant="rounded" height={58} width={'100%'} sx={{ borderRadius: 2 }} />
        ) : (
          selectedServices?.map((service) => <ServiceQueueItem service={service} />)
        )}
      </Stack>
    </Fade>
  )
}
