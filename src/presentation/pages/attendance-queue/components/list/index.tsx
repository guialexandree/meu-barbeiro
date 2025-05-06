import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { List } from '@/presentation/components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { Box, Button, Fade, Icon, Paper, Stack, Typography, Zoom } from '@mui/material'
import { AttendanceItem } from '../attendance-item'
import { Factories } from '@/main/factories/usecases'
import barberImg from '@/presentation/assets/logo.png'

export const AttendanceQueueList: React.FC = () => {
  const navigate = useNavigate()
  const [attendancesResult, setAttendanceResult] = useRecoilState(State.List.attendancesResultState)
  const setPageState = useSetRecoilState(State.listState)
  const setOpenWhatsAppDialog = useSetRecoilState(State.List.openDialogWhatsAppState)
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

  if (!attendancesResult?.data?.length || attendancesResult?.data?.length === 1) {
    return (
      <Fade in timeout={1000} style={{ transitionDelay: '100ms' }} unmountOnExit>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            my: 3,
            mt: 1,
            mx: 2,
            backgroundColor: (theme) => `${theme.palette.primary.dark}20`,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          elevation={0}
        >
          <Stack spacing={2} alignItems='center'>
            <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
              <Icon color="info" sx={{ color: 'info.light' }}>
                info_outline
              </Icon>
              <Typography
                mt={2}
                sx={{ color: 'info.light', fontSize: 14 }}
                variant="h6"
                fontWeight={600}
                fontFamily="Inter"
              >
                NENHUM CLIENTE NA FILA
              </Typography>
            </Stack>

            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              <Box component="img" height={150} width={150} src={barberImg}  sx={{ opacity: 0.3}} />
            </Zoom>

            <Button
              color="primary"
              id="user-create-action"
              fullWidth
              variant="contained"
              onClick={() => {
                navigate('/fila/entrar')
              }}
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
      <Typography mx={2} mt={2} variant="h1">
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
            <Box sx={{ width: '100%', position: 'relative' }}>
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  width: 18,
                  height: 18,
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 4,
                  left: 0,
                  transform: 'translateY(+50%) translateX(-50%)',
                  backgroundColor: 'grey.200',
                  color: 'grey.700',
                }}
              >
                {index + 1}
              </Box>

              <AttendanceItem
                openDialogWhatsapp={() => {
                  setOpenWhatsAppDialog(true)
                }}
                attendance={attendance}
              />
            </Box>
          </Fade>
        ))}
      </List>
    </Stack>
  )
}
