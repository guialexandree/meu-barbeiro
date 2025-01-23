import React from 'react'
import { Alert, Icon, IconButton, Link, Stack } from '@mui/material'

type PageAlertContentProps = {
  message: string
  onAdd: VoidFunction
  onEdit: VoidFunction
}

export const PageAlertContent: React.FC<PageAlertContentProps> = (props) => {
  const FillPanel: React.FC = () => {
    return (
      <>
        {props.message}
        <IconButton size="small" onClick={props.onEdit}>
          <Icon sx={{ fontSize: 16, color: 'grey.500' }}>edit</Icon>
        </IconButton>
      </>
    )
  }

  const EmptyPanel: React.FC = () => {
    return (
      <>
        {'Nenhuma mensagem ativa'}
        <Link href="#" sx={{ ml: 0.5, color: 'info.main', textDecoration: 'none' }} onClick={props.onAdd}>
          Configurar
        </Link>
      </>
    )
  }

  return (
    <Alert
      severity={props.message ? 'success' : 'warning'}
      variant="outlined"
      onClick={props.onEdit}
      sx={{
        fontSize: 12,
        mt: 1,
        color: 'grey.500',
        borderColor: (theme) => `${theme.palette.grey[800]}80`,
        py: 0,
        '.MuiAlert-message': {
          flex: 1,
        },
        '&.MuiPaper-elevation': {
          pr: 0,
        },
      }}
    >
      <Stack
        flex={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pr: props.message ? 0.5 : 1, color: props.message ? 'grey.200' : 'grey.500' }}
      >
        {props.message ? <FillPanel /> : <EmptyPanel />}
      </Stack>
    </Alert>
  )
}
