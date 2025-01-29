import React from 'react'
import { RecoilState, useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Alert, Icon, IconButton, Link, Stack } from '@mui/material'
import { AlertModel } from '@/domain/models'
import * as State from '@/presentation/pages/alerts/components/atoms'

type PageAlertContentProps = {
  alertState: RecoilState<AlertModel>
  type: 'home' | 'services' | 'history'
}

export const PageAlertContent: React.FC<PageAlertContentProps> = (props) => {
  const [alert, setAlert] = useRecoilState(props.alertState)
  const setOpenForm = useSetRecoilState(State.isOpenState)
  const resetNewAlert = useResetRecoilState(State.createUpdateAlertState)
  const setNewAlert = useSetRecoilState(State.createUpdateAlertState)

  const handleAdd = () => {
    resetNewAlert()
    setAlert((currentState) => ({ ...currentState, type: props.type }))
    setOpenForm(true)
  }

  const handleEdit = () => {
    if (alert) {
      setNewAlert(alert)
    }
    setOpenForm(true)
  }

  const FillPanel: React.FC = () => {
    return (
      <>
        {alert.message}
        <IconButton size="small" onClick={handleEdit}>
          <Icon sx={{ fontSize: 16, color: 'grey.500' }}>edit</Icon>
        </IconButton>
      </>
    )
  }

  const EmptyPanel: React.FC = () => {
    return (
      <>
        {'Nenhuma mensagem ativa'}
        <Link href="#" sx={{ ml: 0.5, color: 'info.main', textDecoration: 'none' }} onClick={handleAdd}>
          Configurar
        </Link>
      </>
    )
  }

  return (
    <Alert
      severity={alert.message ? 'success' : 'warning'}
      variant="outlined"
      onClick={handleEdit}
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
        sx={{ pr: alert.message ? 0.5 : 1, color: alert.message ? 'grey.200' : 'grey.500' }}
      >
        {alert.message ? <FillPanel /> : <EmptyPanel />}
      </Stack>
    </Alert>
  )
}
