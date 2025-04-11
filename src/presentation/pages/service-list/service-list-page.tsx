import React from 'react'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { Alert, Fab, Icon, Stack, Zoom } from '@mui/material'
import { ServiceStatus } from '@/domain/models'
import { LoadServicesResult } from '@/domain/usecases'
import { Factories } from '@/main/factories/usecases'
import { PageContainer } from '@/presentation/components'
import { ServiceList, ServiceFilters } from '@/presentation/pages/service-list/components'
import { State } from '@/presentation/pages/service-list/components/atoms'

const ServicesPage: React.FC = () => {
  const navigate = useNavigate()
  const setLoading = useSetRecoilState(State.loadingServicesState)
  const setServices = useSetRecoilState(State.List.servicesState)
  const setError = useSetRecoilState(State.errorServicesState)
  const setEmpty = useSetRecoilState(State.emptyServicesState)
  const setSearch = useSetRecoilState(State.List.servicesSearchState)

  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const serviceResult = (await onLoadServices())!
    if (serviceResult?.success) {
      if (serviceResult.data.length) {
        setServices(serviceResult.data)
      } else {
        setEmpty(true)
      }
      return
    }

    setError(serviceResult?.error || 'Erro ao carregar serviços')
  }, [])

  const onLoadServices = React.useCallback(
    async (search?: string, status?: ServiceStatus): Promise<LoadServicesResult> => {
      try {
        setLoading(true)
        setError('')
        setEmpty(false)
        const servicesResult = await loadServices.load({ search, status })
        return servicesResult
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
      return { success: false } as LoadServicesResult
    },
    [],
  )

  return (
    <PageContainer onInit={onInit} title="Serviços" subtitle="Cadastro de serviços e tabela de preços">
      <Alert
        severity="info"
        variant="outlined"
        sx={{ lineHeight: 1, mb: 2, mx: 2, px: { xs: 1, sm: 3 }, py: 0, alignItems: 'center' }}
      >
        somente serviços ativos serão exibidos no app do cliente
      </Alert>

      <Stack
        direction="row"
        justifyContent="center"
        alignContent="center"
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 1,
          height: 36,
          background:
            'linear-gradient(0deg, rgba(48,48,48,1) 52%, rgba(48,48,48,0.2) 93%, rgba(48,48,48,0) 100%, rgba(48,48,48,0) 100%)',
        }}
      >
        <Zoom in>
          <Fab
            color="primary"
            variant="extended"
            title="Criar novo serviço"
            id="service-create-button"
            onClick={() => { navigate('/servico/criar-novo') }}
            sx={{
              bottom: 30,
              transition: 'opacity 0.3s',
              ':hover': { opacity: 1 },
              ':active': { opacity: 1 },
            }}
          >
            <Icon sx={{ fontSize: 36, color: 'primary.dark' }}>add</Icon>
            criar novo
          </Fab>
        </Zoom>
      </Stack>

      <ServiceFilters loadServices={onLoadServices} />

      <ServiceList onReload={onInit} />
    </PageContainer>
  )
}

export default ServicesPage
