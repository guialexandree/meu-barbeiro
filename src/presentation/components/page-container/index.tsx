import React from 'react'
import { Grid2, Stack } from '@mui/material'
import { PageHeader } from '../page-header'

type PageContainerProps = {
  children: React.ReactNode
  title?: string
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
  return (
    <Grid2
      container
      component="section"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'white',
        pt: 2,
        flexDirection: 'column',
      }}
    >
      {props.title && <PageHeader title={props.title} />}
      <Stack sx={{ p: { xs: 4, sm: 6 }, flex: 1 }}>{props.children}</Stack>
    </Grid2>
  )
}
