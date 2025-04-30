import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { List } from '@/presentation/components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { Box, Button, Fade, Icon, Paper, Stack, Typography, Zoom } from '@mui/material'
import { AttendanceItem } from '../attendance-item'
import { Factories } from '@/main/factories/usecases'
import barberImg from '@/presentation/assets/barber.svg'

export const AttendanceQueueList: React.FC = () => {
  const navigate = useNavigate()
  const [attendancesResult, setAttendanceResult] = useRecoilState(State.List.attendancesResultState)
  const setPageState = useSetRecoilState(State.listState)
  const company = useRecoilValue(GenericState.companyState)

  const loadAttendances = React.useMemo(() => Factories.makeRemoteLoadAttendances(), [])

  const onLoad = React.useCallback(async () => {
    try {
      setPageState({ loading: true, noResults: false, error: '' })
      const result = await loadAttendances.load()
      setAttendanceResult(result)
      setPageState({ loading: false, noResults: false, error: '' })
    } catch (error: any) {
      console.error(error)
      setPageState({ loading: false, noResults: false, error: error.message })
    }
  }, [])

  React.useEffect(() => {
    onLoad()
  }, [])

  if (company?.statusAttendance !== 'serving') {
    return null
  }

  if (!attendancesResult?.data?.length) {
    return (
      <Fade in timeout={1000} style={{ transitionDelay: '100ms' }} unmountOnExit>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            my: 3,
            mt: 1,
            backgroundColor: (theme) => `${theme.palette.primary.dark}20`,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
          elevation={0}
        >
          <Stack spacing={2}>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
              <Icon color="info" sx={{ color: 'info.light' }}>
                info_outline
              </Icon>
              <Typography mt={2} sx={{ color: 'info.light', fontSize: 16 }} variant="h6" fontWeight={800} fontFamily="Inter">
                Nenhum cliente na fila
              </Typography>
            </Stack>

            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              <Box component="img" height={150} src={barberImg} />
            </Zoom>

            <Button
              color="primary"
              id="user-create-action"
              variant="contained"
              onClick={() => { navigate('/fila/entrar') }}
              sx={{
                boxShadow: 0,
                borderRadius: 8,
                border: 'solid 1px',
                borderColor: 'primary.dark',
                fontSize: 14,
                fontWeight: 800,
              }}
              startIcon={<Icon sx={{ mr: 1, fontSize: 24, color: 'primary.dark' }}>data_saver_on</Icon>}
            >
              adicionar
            </Button>
          </Stack>
        </Paper>
      </Fade>
    )
  }

  return (
    <Stack justifyContent="center">
      <Typography mt={2} variant="h6" fontWeight={900} fontFamily="Inter" letterSpacing={1}>
        PRÓXIMOS NA FILA
      </Typography>

      <List
        id="attendance-queue-list"
        onReload={onLoad}
        listState={State.listState}
        messagesStates={{
          noResults: `Nenhum cliente na fila`,
          error: 'Erro ao carregar fila de atendimento',
        }}
      >
        {attendancesResult?.data?.slice(1, 4)?.map((attendance, index) => (
          <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={attendance.id}>
            <span>
              <AttendanceItem attendance={attendance} />
            </span>
          </Fade>
        ))}
      </List>
    </Stack>
  )
}
