import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Slide, Stack, Typography } from '@mui/material'
import { InputRadio } from '@/presentation/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/service-list/components/atoms'

export const Position: React.FC = () => {
  const setSelectedServices = useSetRecoilState(State.selectedServicesState)
  const setLoading = useSetRecoilState(State.loadingUsersState)
  const setUsers = useSetRecoilState(State.usersState)
  const [position, setPosition] = useRecoilState(State.positionState)
  const [services, setServices] = useRecoilState(ServiceState.List.servicesState)

  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])
  const loadSimpleUsers = React.useMemo(() => Factories.makeRemoteLoadSimpleUsers(), [])

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
          if (result.data.length) {
            setServices(result.data)
            const defaultService = result.data.find((service) => service.name.toUpperCase().includes('CORTE'))!
            setSelectedServices([defaultService])
          }
        })
        .catch(console.error)
    }
  }, [])

  const handleChange = React.useCallback((position: 'last' | 'first') => {
    setPosition(position)
  }, [])

  return (
    <Stack spacing={2} justifyContent="space-between">
      <Slide direction="right" in mountOnEnter unmountOnExit style={{ transitionDelay: '50ms' }}>
        <Typography variant="h2">
          POSIÇÃO NA FILA
        </Typography>
      </Slide>
      <Stack spacing={1}>
        <InputRadio<'first' | 'last'>
          label="ADICIONAR NO FINAL"
          icon='south'
          value="last"
          key={`position-last`}
          checked={position === 'last'}
          onChange={handleChange}
          description="Padrão, adiciona no final da fila de atendimento"
        >
          <Typography color='primary' sx={{ textTransform: 'uppercase', fontSize: 16, fontWeight: 500, mt: 1 }}>
            Previsão de atendimento às 19:40
          </Typography>
        </InputRadio>
        <InputRadio<'first' | 'last'>
          label="ADICIONAR NO INÍCIO"
          value="first"
          icon='north'
          key={`position-first`}
          checked={position === 'first'}
          onChange={handleChange}
          description="Adiciona no início da fila de atendimento, será o próximo a ser atendido"
        />
      </Stack>
    </Stack>
  )
}
