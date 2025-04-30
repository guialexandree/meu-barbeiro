import React from 'react'
import { Divider, Zoom, Icon, IconButton, Paper, Stack, Typography } from '@mui/material'

export const QueueInfo: React.FC = () => {
  return (
    <Zoom in timeout={500} style={{ transitionDelay: '400ms' }} unmountOnExit>
      <Paper
        component="header"
        elevation={0}
        sx={{
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(0deg,rgba(44, 130, 216, 1) 0%, #569bdf 60%)',
          borderRadius: 1,
          flexGrow: 1,
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: 'space-between',
          padding: 1,
          px: 1.5,
          mb: 0.5,
        }}
      >
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton size="large" sx={{ p: 0 }}>
            <Icon>sort</Icon>
          </IconButton>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
              Status
            </Typography>
            <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
              12 na fila
            </Typography>
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack sx={{ pr: 2 }} spacing={0.5}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
            Atendimentos
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton size="small" sx={{ p: 0 }}>
              <Icon sx={{ fontSize: 14 }}>content_cut</Icon>
            </IconButton>
            <Stack direction='row' alignItems="center" spacing={0.5}>
              <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
                5 realizados
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
            Saldo do dia
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '600', fontSize: 14 }}>
              R$ ****
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Zoom>
  )
}
