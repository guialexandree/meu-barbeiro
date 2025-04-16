import React from 'react'
import { Avatar, Chip, Icon, IconButton, Stack, Typography } from '@mui/material'

export const QueueInfo: React.FC = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1} pr={2}>
      <Chip
        color="default"
        sx={{ borderRadius: 16, backgroundColor: 'primary.dark', color: 'primary.light' }}
        avatar={<Avatar sx={{ backgroundColor: 'primary.main' }} alt="5" src="5" />}
        label="NA FILA"
      />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Stack direction="column" alignItems="flex-end" sx={{ borderRight: '1px solid', pr: 2 }}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300' }}>
            Atendimentos
          </Typography>
          <Stack direction="row" alignItems="center">
            <IconButton size="small">
              <Icon sx={{ fontSize: 18 }}>content_cut</Icon>
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              12
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="column" alignItems="flex-end" pl={1}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', textAlign: 'right' }}>
            Saldo do dia
          </Typography>
          <Stack direction="row" justifyContent="flex-end">
            <Typography variant="subtitle1" sx={{ fontWeight: '600', textAlign: 'right' }}>
              R$ ***
            </Typography>
            <IconButton size="small">
              <Icon sx={{ fontSize: 18 }}>visibility</Icon>
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
