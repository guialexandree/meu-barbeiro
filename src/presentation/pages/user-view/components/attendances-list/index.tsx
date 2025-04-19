import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  Box,
  Button,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { PageLoader } from '@/presentation/components'
import { State } from '@/presentation/pages/user-view/components/atoms'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'

export const AttendancesList: React.FC = () => {
  const [error, setError] = useRecoilState(State.List.errorState)
  const noResults = useRecoilValue(State.List.noResultsState)
  const loading = useRecoilValue(State.loadingState)

  if (loading) {
    return <PageLoader loading />
  }

  if (error) {
    return (
      <Stack id="error-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box
          component="img"
          src={errorListImg}
          alt="Erro ao carregar atendimentos do cliente"
          width={180}
          height={180}
        />
        <Typography variant="h6" align="center">
          Erro ao carregar atendimentos do cliente
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          id="reload-attendances-by-user"
          onClick={() => {
            setError('')
          }}
        >
          tentar novamente
        </Button>
      </Stack>
    )
  }

  if (noResults) {
    return (
      <Stack id="no-results-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} px={2} alignItems="center" spacing={1}>
        <Box component="img" src={emptyListImg} alt="Nenhum atendimento registrado" width={160} height={160} />
        <Typography variant="h6" align="center">
          {`Nenhum atendimento registrado para o cliente`}
        </Typography>
        <Button id="empty-action-list" variant="outlined" color="primary">
          remover filtros
        </Button>
      </Stack>
    )
  }

  return (
    <Stack mt={2} width="100%">
      <Typography variant="h6" fontSize={16} color="primary.main" fontWeight={600} lineHeight={1}>
        HISTÓRICO DE ATENDIMENTOS
      </Typography>

      <List dense disablePadding id="attendances-by-user-list" sx={{ width: '100%' }}>
        <ListItem
          sx={{ m: 0, mt: 1, pl: 2, backgroundColor: (theme) => `${theme.palette.primary.light}10`, borderRadius: 2 }}
          disablePadding
        >
          <ListItemText
            sx={{ flex: 1 }}
            primary={'BARBA'}
            secondary={'BARBA'}
            slotProps={{
              primary: { sx: { fontSize: 13 } },
              secondary: { sx: { fontSize: 11 } },
            }}
          />
          <ListItemText
            primary={'JANEIRO'}
            secondary={'09:30'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              pr: 2,
            }}
          />

          <ListItemIcon sx={{ minWidth: 40 }}>
            <IconButton size="small" sx={{ backgroundColor: 'background.paper' }}>
              <Icon>navigate_next</Icon>
            </IconButton>
          </ListItemIcon>
        </ListItem>
        <ListItem
          sx={{ display: 'flex', m: 0,mt: 1,  pl: 2, backgroundColor: (theme) => `${theme.palette.primary.light}10`, borderRadius: 2 }}
          disablePadding
        >
          <ListItemText
            sx={{ flex: 1 }}
            primary={'CORTE'}
            secondary={'CORTE + HIDRATAÇÃO'}
            slotProps={{
              primary: { sx: { fontSize: 13 } },
              secondary: { sx: { fontSize: 11 } },
            }}
          />
          <ListItemText
            primary={'FEVEREIRO'}
            secondary={'12:35'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              pr: 2,
            }}
          />

          <ListItemIcon sx={{ minWidth: 40 }}>
            <IconButton size="small" sx={{ backgroundColor: 'background.paper' }}>
              <Icon>navigate_next</Icon>
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </List>
    </Stack>
  )
}
