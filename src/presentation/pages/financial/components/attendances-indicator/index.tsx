import React from 'react'
import { Box, Icon, Paper, Slide, Stack, Typography } from '@mui/material'

export const AttendanceIndicator: React.FC = () => {
  return (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1, sm: 2 },
          flexGrow: 0.5,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          maxWidth: 140,
          backgroundColor: 'grey.800',
          border: 'solid 2px',
          borderColor: (theme) => `${theme.palette.primary.main}54`,
        }}
      >
        <Stack direction="row" sx={{ color: 'grey.400' }} alignItems="flex-start" spacing={1}>
          <Box
            sx={{
              backgroundColor: theme => `${theme.palette.grey[700]}54`,
              p: 0.7,
              borderRadius: 1,
            }}
          >
            <Icon sx={{ fontSize: { xs: 14, sm: 26 } }}>content_cut</Icon>
          </Box>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: '500', letterSpacing: -3, lineHeight: 1, color: 'white' }}>
              {'14'}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="caption" color='grey.400'>{'atendimentos hoje'}</Typography>
      </Paper>
    </Slide>
  )
}
