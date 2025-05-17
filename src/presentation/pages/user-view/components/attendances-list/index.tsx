import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, Button, Divider, Fade, List, Stack, Typography } from '@mui/material'
import { PageLoader } from '@/presentation/components'
import { State } from '@/presentation/pages/user-view/components/atoms'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'
import { AttendanceItem } from '../attendance-item'

type AttendanceListProps = {
  userId: string
  onReload: (id: string) => Promise<void>
}

export const AttendancesList: React.FC<AttendanceListProps> = (props) => {
  const [error, setError] = useRecoilState(State.List.errorState)
  const noResults = useRecoilValue(State.List.noResultsState)
  const loading = useRecoilValue(State.loadingState)
  const attendancesUser = useRecoilValue(State.List.attendancesUserState)

  if (loading || !props.userId) {
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
            props.onReload(props.userId)
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
      <Typography variant="h2" fontSize={16} color="primary.main">
        HISTÓRICO DE ATENDIMENTOS
      </Typography>

      <List
        dense
        disablePadding
        id="attendances-by-user-list"
        sx={{
          width: '100%',
          mt: 1,
          py: 0.5,
          backgroundColor: (theme) => `${theme.palette.primary.light}10`,
          borderRadius: 3,
        }}
      >
        {attendancesUser.map((attendance, index) => (
          <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={attendance.id}>
            <span>
              <AttendanceItem attendance={attendance} />
              <Divider sx={{ borderColor: 'background.default' }} orientation="horizontal" flexItem />
            </span>
          </Fade>
        ))}
      </List>
    </Stack>
  )
}
