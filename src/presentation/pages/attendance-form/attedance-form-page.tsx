import React from 'react'
import { Autocomplete, Button, Icon, Stack, TextField, Typography } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/service-list/components/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ServiceQueueItem } from './components'

const UserFormPage: React.FC = () => {
  const [users, setUsers] = useRecoilState(State.usersState)
  const [services, setServices] = useRecoilState(ServiceState.List.servicesState)
  const setLoading = useSetRecoilState(State.loadingUsersState)

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

  return (
    <PageContainer title="Entrar na fila" subtitle="Crie clientes ou barbeiros para utilizar o app">
      <Stack spacing={2} mx={2} height={'100%'}>
        <Autocomplete
          disablePortal
          fullWidth
          options={options}
          sx={{ maxWdth: 600 }}
          renderInput={(params) => <TextField {...params} label="Informe o cliente" />}
        />
        <Stack spacing={1}>
          <Typography mt={2} variant="h6" fontWeight={900} fontFamily="Inter" letterSpacing={1}>
            SERVIÇOS A REALIZAR
          </Typography>

          {!!services.length && <ServiceQueueItem service={services?.at(1)}/>}
          {!!services.length && <ServiceQueueItem service={services?.at(3)}/>}

          <Button variant='outlined' color='success' fullWidth endIcon={<Icon>add</Icon>}>Adicionar serviço</Button>
        </Stack>
      </Stack>
    </PageContainer>
  )
}

export default UserFormPage
