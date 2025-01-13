import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  List,
  ListSubheader,
} from '@mui/material'
import { ServiceListItem } from '@/presentation/pages/services/components'
import * as State from '@/presentation/pages/services/components/atoms'

export const ServiceList: React.FC = () => {
  const services = useRecoilValue(State.servicesState)
  const loading = useRecoilValue(State.isLoadingState)
  const loadingUpdate = useRecoilValue(State.isLoadingUpdateState)

  if (loading || loadingUpdate) {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  if (!services.length) {
    return <Box sx={{ backgroundColor: 'red', p: 4 }}>VAZIO</Box>
  }

  return (
    <Fade in timeout={700}>
      <Box sx={{ mx: 2 }}>
        <List disablePadding sx={{}}>
          <ListSubheader
            sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          >
            SERVIÇOS
          </ListSubheader>
          {services.map((service) => (
            <ServiceListItem key={service.id} service={service} />
          ))}
        </List>
      </Box>
    </Fade>
  )
}
