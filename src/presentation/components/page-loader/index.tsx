import React from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import logoImg from '@/presentation/assets/logo.png'

type PageLoaderProps = {
  title?: string
  loading?: boolean
}

export const PageLoader: React.FC<PageLoaderProps> = (props) => {
  return (
    <Backdrop open={!!props.loading} sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}>
      <CircularProgress
        color="secondary"
        size={102}
        sx={{
          position: 'absolute',
          zIndex: 1,
        }}
      />

      <Box
        component="img"
        src={logoImg}
        alt="Logo da barbearia"
        id="logo"
        height={100}
        sx={{
          display: { xs: 'block', sm: 'none' },
          zIndex: 2,
          width: '100%',
          objectFit: 'contain',
        }}
      />
    </Backdrop>
  )
}
