import React from 'react'
import { Grid2, Stack } from '@mui/material'

type PageContainerProps = {
  children: React.ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
  return (
    <Grid2
      container
      component="section"
      sx={{
        pt: 'calc(16vh + 16px)',
        pb: 6,
        minHeight: '80vh',
        color: 'white',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <Stack sx={{ flex: 1 }}>{props.children}</Stack>
    </Grid2>
  )
}
