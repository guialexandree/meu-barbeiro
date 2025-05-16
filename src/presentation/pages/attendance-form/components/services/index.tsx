import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade, Grow, Icon, IconButton, Paper, Skeleton, Slide, Stack, Tooltip, Typography } from '@mui/material'
import { State } from '@/presentation/pages/attendance-form/components/atoms'

export const Services: React.FC = () => {
  const selectedServices = useRecoilValue(State.selectedServicesState)
  const loading = useRecoilValue(State.loadingServicesState)

  return (
    <Fade in mountOnEnter unmountOnExit>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Slide direction="right" in mountOnEnter unmountOnExit style={{ transitionDelay: '100ms' }}>
            <Typography variant="h2">SERVIÇOS A REALIZAR</Typography>
          </Slide>
        </Stack>

        {(loading || !selectedServices.length) && (
          <Grow in>
            <Skeleton variant="rounded" height={50} width={'100%'} sx={{ borderRadius: 2 }} />
          </Grow>
        )}

        <Paper
          variant="outlined"
          sx={{
            borderRadius: 3,
            py: 1.5,
            backgroundColor: (theme) => `${theme.palette.primary.main}10`,
          }}
        >
          {!!selectedServices.length && (
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
              <Typography variant="body1" sx={{ flex: 1, fontSize: 18, fontFamily: 'Inter', ml: 2 }}>
                {selectedServices.map((service) => service.name.toUpperCase()).join(', ')}
              </Typography>

              <Stack justifyContent="center" alignItems="center" sx={{ px: 1 }}>
                <Typography sx={{ fontSize: 18, fontFamily: 'Inter', lineHeight: 1 }}>
                  {`R$ ${selectedServices.reduce((acc, service) => acc + +service.price, 0).toFixed(0)}`}
                </Typography>
                <Typography sx={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 300, color: 'text.secondary' }}>
                  {`${selectedServices.reduce((acc, service) => acc + service.timeExecution, 0).toFixed(0)} min`}
                </Typography>
              </Stack>

              <Tooltip title="Editar serviços" placement="top" arrow>
                <IconButton size="small" sx={{ color: 'text.secondary', mx: 1.5 }}>
                  <Icon fontSize="small" sx={{ fontSize: 14 }}>
                    arrow_forward_ios
                  </Icon>
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Paper>
      </Stack>
    </Fade>
  )
}
