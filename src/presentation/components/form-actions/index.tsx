import React from 'react'
import { Stack } from '@mui/material'

type FormActionsProps = {
  children: React.ReactNode | React.ReactNode[]
}

export const FormActions: React.FC<FormActionsProps> = (props) => {
  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: 12,
        right: 0,
        left: 0,
        zIndex: 1,
        Width: '100%',
        px: { xs: 2, sm: 4 },
        py: { xs: 1, sm: 2 },
      }}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={1}
    >
      {props.children}
    </Stack>
  )
}
