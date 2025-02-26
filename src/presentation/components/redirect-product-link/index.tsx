import React from 'react'
import { Slide, Stack, Typography } from '@mui/material'

export const RedirectProductLink: React.FC = () => {
  return (
    <Slide direction="up" in mountOnEnter unmountOnExit>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ position: 'absolute', width: '100%', left: 0, bottom: 8, textTransform: 'uppercase' }}
        component="a"
        target="_blank"
        href="https://meubarbeiro.app"
      >
        <Typography fontWeight="300" color="grey.400">
          meu
        </Typography>
        <Typography fontWeight="600">barbeiro.APP</Typography>
      </Stack>
    </Slide>
  )
}
