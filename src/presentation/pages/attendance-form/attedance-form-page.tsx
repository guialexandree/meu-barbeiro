import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Autocomplete, Stack, TextField } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/service-list/components/atoms'
import { Actions, Position, Services } from './components'

const UserFormPage: React.FC = () => {
  const setSelectedServices = useSetRecoilState(State.selectedServicesState)
  const setLoading = useSetRecoilState(State.loadingUsersState)
  const setServices = useSetRecoilState(ServiceState.List.servicesState)
  const [users, setUsers] = useRecoilState(State.usersState)
  const [selectedUser, setSelectedUser] = useRecoilState(State.selectedUserState)

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

    loadServices
      .load({ search: '' })
      .then((result) => {
        if (result.data.length) {
          setServices(result.data)
          const defaultService = result.data.find((service) => service.name.toUpperCase().includes('CORTE'))!
          setSelectedServices([defaultService])
        }
      })
      .catch(console.error)
  }, [])

  return (
    <PageContainer title="Adicionar na fila">
      <Stack
        component="form"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <Stack spacing={2} mx={2} height={'100%'}>
          <Autocomplete
            disablePortal
            fullWidth
            value={selectedUser}
            options={options}
            onChange={(_, newValue) => {
              setSelectedUser(newValue!)
            }}
            renderInput={(params) => <TextField {...params} label="Cliente" placeholder="Informe o cliente" name='client' />}
          />

          <Services />

          <Position />
        </Stack>

        <Actions />
      </Stack>
    </PageContainer>
  )
}

export default UserFormPage
