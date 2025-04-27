import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import { SaveAction, UpdateFormAction } from '@/presentation/pages/user-form/components'
import { CancelAction } from '@/presentation/components'

export const Actions: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBackToList = React.useCallback(() => {
    navigate('/clientes')
  }, [])

  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        mx: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 4 },
        py: { xs: 1, sm: 2 },
      }}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={2}
    >
      <CancelAction fullWidth onCancel={handleGoBackToList} enterDelay={250} />
      <UpdateFormAction />
      <SaveAction />
    </Stack>
  )
}
