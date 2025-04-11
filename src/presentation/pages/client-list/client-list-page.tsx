import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Fab, Icon, Stack, Zoom } from '@mui/material'
import { LoadClientsResult } from '@/domain/usecases'
import { PageContainer } from '@/presentation/components'
import { ClientFilters, ClientList, Totalizers } from '@/presentation/pages/client-list/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/client-list/components/atoms'

const ClientsPage: React.FC = () => {
  const navigate = useNavigate()
  const setLoading = useSetRecoilState(State.loadingClientsState)
  const setError = useSetRecoilState(State.errorClientsState)
  const setEmpty = useSetRecoilState(State.emptyClientsState)
  const setClients = useSetRecoilState(State.List.clientsResultState)
  const setSearch = useSetRecoilState(State.List.textSearchState)
  const [page] = React.useState(1)
  const [limit] = React.useState(10)

  const loadClients = React.useMemo(() => Factories.makeRemoteLoadClients(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const clientResult = (await onLoadClients())!
    if (clientResult?.success) {
      if (clientResult.data.length) {
        setClients(clientResult)
      } else {
        setEmpty(true)
      }
      return
    }

    setError(clientResult?.error || 'Erro ao carregar serviços')
  }, [])

  const onLoadClients = React.useCallback(
    async (search?: string): Promise<LoadClientsResult> => {
      try {
        setLoading(true)
        setError('')
        setEmpty(false)
        const clientsResult = await loadClients.load({ page, limit, search })
        return clientsResult
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
      return { success: false } as LoadClientsResult
    },
    [],
  )

  return (
    <PageContainer
      onInit={onInit}
      title="Clientes"
      subtitle="Visualizar cadastro de clientes com informações de contato"
    >
      <Totalizers />

      <ClientFilters loadClients={onLoadClients} />

      <ClientList onReload={onLoadClients}/>

      <Stack direction="row" justifyContent="center">
        <Zoom in>
          <Fab
            onClick={() => { navigate('/clientes/criar-novo') }}
            sx={{
              position: 'fixed',
              bottom: '16px',
              opacity: 0.8,
              transition: 'opacity 0.3s',
              ':hover': { opacity: 1 },
              ':active': { opacity: 1 },
            }}
          >
            <Icon sx={{ fontSize: 36, color: 'primary.dark' }}>add</Icon>
          </Fab>
        </Zoom>
      </Stack>
    </PageContainer>
  )
}

export default ClientsPage
