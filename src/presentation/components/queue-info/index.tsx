import React from 'react'
import { Divider, Icon, IconButton, Paper, Stack, Typography } from '@mui/material'

export const QueueInfo: React.FC = () => {
  return (
    <Paper
      component="header"
      elevation={0}
      sx={{
        backgroundColor: (theme) => `${theme.palette.primary.light}80`,
        borderRadius: 2,
        flexGrow: 1,
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
        px: 2,
        mb: 0.5,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{
            backgroundColor: (theme) => `${theme.palette.primary.dark}80`,
            borderRadius: 20,
            p: 0.5,
            fontSize: 12,
            width: 22,
            height: 20,
            textAlign: 'center',
          }}
        >
          5
        </Stack>
        <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
          NA FILA
        </Typography>
      </Stack>

      <Divider orientation="vertical" flexItem />

      <Stack direction="column" sx={{ pr: 2 }} spacing={0.5}>
        <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
          Atendimentos
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton size="small" sx={{ p: 0 }}>
            <Icon sx={{ fontSize: 14 }}>content_cut</Icon>
          </IconButton>
          <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
            12
          </Typography>
        </Stack>
      </Stack>

      <Divider orientation="vertical" flexItem />

      <Stack direction="column" spacing={0.5}>
        <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
          Saldo do dia
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '600', fontSize: 14 }}>
            R$ ***
          </Typography>
          <IconButton size="small" sx={{ p: 0 }}>
            <Icon fontSize="small" sx={{ fontSize: 14 }}>
              visibility
            </Icon>
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  )
}
