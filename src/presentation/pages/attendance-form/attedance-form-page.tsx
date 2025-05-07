import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/service-list/components/atoms'
import { Actions, Client, Position, Services } from './components'

const UserFormPage: React.FC = () => {
  const setSelectedServices = useSetRecoilState(State.selectedServicesState)
  const setLoading = useSetRecoilState(State.loadingUsersState)
  const setServices = useSetRecoilState(ServiceState.List.servicesState)
  const setUsers = useSetRecoilState(State.usersState)

  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])
  const loadAvailablesUsers = React.useMemo(() => Factories.makeRemoteLoadAvailablesUsers(), [])

  const onLoad = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await loadAvailablesUsers.load()
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
    <PageContainer>
      <Stack
        component="form"
        sx={{ height: '100vh', display: 'flex', justifyContent: 'space-between' }}
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <Stack spacing={3} mx={2} height={'100%'}>
          <Client />
          <Services />
          <Position />
        </Stack>

        <Actions />
      </Stack>
    </PageContainer>
  )
}

export default UserFormPage
