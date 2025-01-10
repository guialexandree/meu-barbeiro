import { Stack, Typography } from '@mui/material'
import React from 'react'

type PageHeaderProps = {
  title?: string
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <Stack
      component="header"
      sx={{
        p: 2,
        backgroundColor: 'primary.main',
        height: '20vh',
        maxHeight: '20vh',
        justifyContent: 'flex-end',
        flex: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: '400',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {props.title}
      </Typography>
    </Stack>
  )
}
