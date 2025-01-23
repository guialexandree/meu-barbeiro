import React from 'react'
import { Chip, Icon, Paper, Slide, Stack, Typography } from '@mui/material'

export const MovementsIndicator: React.FC = () => {
  return (
    <Slide direction="right" in mountOnEnter unmountOnExit>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1, sm: 2 },
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          maxWidth: 300,
          backgroundColor: 'grey.800',
          position: 'relative',
          border: 'solid 2px',
          borderColor: (theme) => `${theme.palette.primary.main}54`,
        }}
      >
        <Typography sx={{ color: 'grey.400' }} variant="caption">
          saldo de hoje
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: '500', letterSpacing: -3, lineHeight: 1 }}>
            {'R$ 550'}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: '50%',
            transform: 'translateY(50%)',
            right: 0,
            mr: 1,
          }}
        >
         <Icon sx={{ color: 'grey.600', fontSize: 46, opacity: .4 }}>local_atm</Icon>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: -18,
            right: 0,
            mr: 1,
          }}
        >
          <Chip size="small" label={'R$ 835'} icon={<Icon>trending_up</Icon>} color="success" />
          <Chip size="small" label={'R$ 325'} icon={<Icon>trending_down</Icon>} color="error" />
        </Stack>
      </Paper>
    </Slide>
  )
}
