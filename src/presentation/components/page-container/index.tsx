import React from 'react'
import { Grid2, Stack } from '@mui/material'
import { PageTitle } from '../page-title'

type PageContainerProps = {
  children: React.ReactNode
  onInit?: () => Promise<void>
  title?: string
  subtitle?: string
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {

  return (
    <Grid2
      container
      component="section"
      sx={{
        pt: 4,
        pb: 6,
        minHeight: '100%',
        color: 'white',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: '100vw',
        backgroundColor: 'background.default',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {props.title && <PageTitle title={props.title} subtitle={props.subtitle} />}
      <Stack sx={{ flex: 1, width: '100%', pt: 1.5 }} >{props.children}</Stack>
    </Grid2>
  )
}
