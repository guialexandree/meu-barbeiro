import React from 'react'
import {
  Autocomplete,
  FormControlLabel,
  Icon,
  IconButton,
  Paper,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/service-list/components/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Actions, ServiceQueueItem } from './components'

const UserFormPage: React.FC = () => {
  const [users, setUsers] = useRecoilState(State.usersState)
  const [services, setServices] = useRecoilState(ServiceState.List.servicesState)
  const setLoading = useSetRecoilState(State.loadingUsersState)
  const [selectedValue, setSelectedValue] = React.useState('a')

  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])
  const loadSimpleUsers = React.useMemo(() => Factories.makeRemoteLoadSimpleUsers(), [])
  const options = React.useMemo(() => users.map((user) => ({ label: user.name.toUpperCase(), id: user.id })), [users])

  const onLoad = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await loadSimpleUsers.load()
      setUsers(result.data)
      setLoading(false)
    } catch (error: any) {
      console.error(error)
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    onLoad()

    if (!services?.length) {
      loadServices
        .load({ search: '' })
        .then((result) => {
          setServices(result.data)
        })
        .catch(console.error)
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <PageContainer title="Entrar na fila" subtitle="Crie clientes ou barbeiros para utilizar o app">
      <Stack spacing={2} mx={2} height={'100%'}>
        <Autocomplete
          disablePortal
          fullWidth
          options={options}
          sx={{ maxWdth: 600 }}
          renderInput={(params) => <TextField {...params} label="Cliente" placeholder="Informe o cliente" />}
        />
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight={900} fontFamily="Inter" letterSpacing={1}>
              SERVIÇOS A REALIZAR
            </Typography>
            <IconButton size="small" color="info" sx={{ backgroundColor: (theme) => `${theme.palette.info.light}20` }}>
              <Icon fontSize="small">add</Icon>
            </IconButton>
          </Stack>

          {!!services.length && <ServiceQueueItem service={services?.at(1)} />}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={900} fontFamily="Inter" letterSpacing={1}>
            POSIÇÃO NA FILA
          </Typography>
          <Paper
            variant="outlined"
            sx={{ display: 'flex', flexDirection: 'column', p: 2, backgroundColor: 'background.paper' }}
            elevation={0}
          >
            <FormControlLabel
              label="ADICIONAR NO FINAL"
              value="Adicionar no final"
              slotProps={{ typography: { fontWeight: '600', color: 'text.primary' } }}
              control={
                <Radio
                  checked={selectedValue === 'a'}
                  onChange={handleChange}
                  value="a"
                  size="small"
                  name="radio-buttons"
                  slotProps={{ input: { 'aria-label': 'A', sx: { p: 0 } }, root: { sx: { py: 0 } } }}
                />
              }
            />
            <Typography variant="caption" fontWeight={500} color="text.secondary" letterSpacing={1}>
              Adicionar no final da fila de atendimento
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{ display: 'flex', flexDirection: 'column', p: 2, backgroundColor: 'background.paper' }}
            elevation={0}
          >
            <FormControlLabel
              label="ADICIONAR NO INÍCIO"
              value="Adicionar no final"
              slotProps={{ typography: { fontWeight: '600', color: 'text.primary' } }}
              control={
                <Radio
                  checked={selectedValue === 'b'}
                  onChange={handleChange}
                  value="b"
                  size="small"
                  name="radio-buttons"
                  slotProps={{ input: { 'aria-label': 'A', sx: { p: 0 } }, root: { sx: { py: 0 } } }}
                />
              }
            />
            <Typography variant="caption" fontWeight={500} color="text.secondary" letterSpacing={1}>
              Adicionar no início da fila de atendimento, será o próximo a ser atendido
            </Typography>
          </Paper>
        </Stack>
      </Stack>

      <Actions />
    </PageContainer>
  )
}

export default UserFormPage
