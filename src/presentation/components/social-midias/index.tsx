import React from 'react'
import { Icon, IconButton, Stack } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

export const SocialMidias: React.FC = () => {
  return (
    <Stack direction='row' justifyContent="center" alignItems="center" mt={2}>
      <IconButton size='large' color='inherit'>
        <InstagramIcon sx={{ fontSize: 38 }} />
      </IconButton>
      <IconButton size='large' color='inherit'>
        <Icon sx={{ fontSize: 38 }}>facebook</Icon>
      </IconButton>
      <IconButton size='large' color='inherit'>
        <WhatsAppIcon sx={{ fontSize: 38 }} />
      </IconButton>
    </Stack>
  )
}
