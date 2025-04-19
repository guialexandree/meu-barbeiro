import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Avatar, Button, Chip, Fade, Icon, IconButton, Paper, Slide, Stack, Typography } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { NotfoundError } from '@/domain/errors'
import { PageContainer, PageLoader } from '@/presentation/components'
import { State } from '@/presentation/pages/user-view/components/atoms'
import { AttendancesList } from '@/presentation/pages/user-view/components'
import { useFormat, useNotify } from '@/presentation/hooks'

const UsersViewPage: React.FC = () => {
  const { formatPhoneNumber } = useFormat()
  const notify = useNotify()
  const navigate = useNavigate()
  const [loading, setLoading] = useRecoilState(State.loadingState)
  const [userResult, setUserResult] = useRecoilState(State.userResultState)
  const setError = useSetRecoilState(State.errorUserState)

  const { id } = useParams()
  const loadUserById = React.useMemo(() => Factories.makeRemoteLoadUserById(), [])

  const onLoadUser = React.useCallback((id: string) => {
    setLoading(true)
    setError('')

    loadUserById
      .load({ id })
      .then((userResult) => {
        if (userResult.data) {
          setUserResult(userResult)
        }
      })
      .catch((error) => {
        if (error instanceof NotfoundError) {
          notify.notify(error.message, { type: 'error' })
          navigate('/clientes')
          return
        }
        setError((error as Error).message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (id) {
      onLoadUser(id)
    } else {
      setUserResult(null as any)
    }
  }, [id])

  if (loading || !userResult) {
    return <PageLoader loading />
  }

  return (
    <PageContainer>
      <Stack alignItems="flex-start" justifyContent="center" px={2}>
        <Stack component="header" direction="row" justifyContent="space-between" alignItems="center" width={'100%'} spacing={2}>
          <Avatar
            alt="Imagem do usuário"
            src={`/public/img/avataaars${Math.floor(Math.random() * 7) + 1}.svg`}
            sx={{
              width: 80,
              height: 80,
              border: 'solid 3px',
              borderColor: 'grey.400',
              backgroundColor: '#111111',
              color: 'text.primary',
            }}
          />

          <Stack alignItems="flex-start" spacing={0.7}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5} width="100%">
              <Typography variant="h5" fontWeight={600} lineHeight={1}>
                {userResult.data.name?.toUpperCase()?.split(' ')?.at?.(0)}
              </Typography>
              <IconButton sx={{ backgroundColor: 'background.default' }} edge="end" aria-label="editar">
                <Icon sx={{ fontSize: 16 }}>edit</Icon>
              </IconButton>
            </Stack>
            <Chip
              size="small"
              sx={{ borderRadius: 2, fontSize: 12, color: 'text.secondary' }}
              label={userResult.data.role === 'barber' ? 'BARBEIRO' : 'CLIENTE'}
            />

            <Typography variant="caption" color="text.disabled" lineHeight={1}>
              cadastrado {userResult.data?.createdAt?.toString()}
            </Typography>
          </Stack>
        </Stack>

        <Fade in timeout={1000}>
          <Paper variant="elevation" elevation={0} sx={{ width: '100%', mt: 2, p: 2 }}>
            <Typography variant="h6" fontSize={16} color="primary.main" fontWeight={600} lineHeight={1}>
              INFORMAÇÕES
            </Typography>
            <Stack alignItems="flex-start" mt={1}>
              <Stack direction="column" alignItems="flex-start" spacing={0.5} mt={1}>
                <Typography variant="body2" fontSize={14} fontWeight={600} lineHeight={1}>
                  Telefone
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.4}>
                  <Typography variant="body2" fontSize={14} color="text.secondary" lineHeight={1}>
                    {formatPhoneNumber(userResult.data.contactNumber.slice(-11))}
                  </Typography>

                  <IconButton
                    size="small"
                    sx={{ p: 0.4, backgroundColor: 'background.default' }}
                    edge="end"
                    aria-label="copiar"
                  >
                    <Icon sx={{ fontSize: 16 }}>content_copy</Icon>
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Fade>

        <Stack direction="row" alignItems="center" width="100%" mt={1} spacing={1}>
          <Slide in={true} direction="right" unmountOnExit mountOnEnter>
            <Button
              fullWidth
              id="go-to-list-action"
              startIcon={<Icon>arrow_back</Icon>}
              color="inherit"
              variant="outlined"
              sx={{ borderColor: 'grey.700' }}
              onClick={() => {
                navigate('/clientes')
              }}
            >
              voltar
            </Button>
          </Slide>

          <Slide in={true} direction="left" unmountOnExit mountOnEnter>
            <Button
              fullWidth
              id="go-to-list-action"
              variant="outlined"
              onClick={() => {
                navigate('/clientes')
              }}
              endIcon={<WhatsAppIcon />}
              color="success"
            >
              WhatsApp
            </Button>
          </Slide>
        </Stack>

        <AttendancesList />
      </Stack>
    </PageContainer>
  )
}

export default UsersViewPage
