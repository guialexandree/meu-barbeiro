import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Fab, Icon, Stack, Zoom } from '@mui/material'
import { LoadClientsResult } from '@/domain/usecases'
import { PageContainer, ValueIndicator } from '@/presentation/components'
import { ClientList } from '@/presentation/pages/clients/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/clients/components/atoms'

const ClientsPage: React.FC = () => {
  const setLoading = useSetRecoilState(State.loadingClientsState)
  const setClients = useSetRecoilState(State.List.clientsState)
  const setError = useSetRecoilState(State.errorClientsState)
  const setEmpty = useSetRecoilState(State.emptyClientsState)
  const setSearch = useSetRecoilState(State.List.textSearchState)

  const loadClients = React.useMemo(() => Factories.makeRemoteLoadClients(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const serviceResult = (await onLoadClients())!
    if (serviceResult?.success) {
      if (serviceResult.data.length) {
        setClients(serviceResult.data)
      } else {
        setEmpty(true)
      }
      return
    }

    setError(serviceResult?.error || 'Erro ao carregar serviços')
  }, [])

  const onLoadClients = React.useCallback(
    async (): Promise<LoadClientsResult> => {
      try {
        setLoading(true)
        setError('')
        setEmpty(false)
        const clientsResult = await loadClients.load()
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
      <Stack direction="row" spacing={1} mx={2} mb={1}>
        <ValueIndicator title="Total de clientes" value="682" entryDirection="right" icon="peoples" />

        <ValueIndicator
          title="Novos clientes"
          value="23"
          subvalue="10%"
          descriptionSubvalue="10% de crescimento em relação ao mês anterior"
          entryDirection="left"
          icon="grade"
        />
      </Stack>

      <ClientList onReload={onLoadClients}/>

      <Stack direction="row" justifyContent="center">
        <Zoom in>
          <Fab
            onClick={() => {}}
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
