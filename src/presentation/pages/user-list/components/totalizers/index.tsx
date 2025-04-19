import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { ValueIndicator } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'
import { Factories } from '@/main/factories/usecases'

export const Totalizers: React.FC = () => {
  const [usersTotalizer, setUsersTotalizer] = useRecoilState(State.List.usersTotalizerResultState)
  const setLoading = useSetRecoilState(State.List.loadingUsersTotalizerResultState)

  const loadUsersTotalizer = React.useMemo(() => Factories.makeRemoteLoadUsersTotalizer(), [])

  const onLoadUsersTotalizer =() => {
    loadUsersTotalizer
      .load()
      .then(usersTotalizerResult => {
        if (usersTotalizerResult?.success) {
          setUsersTotalizer(usersTotalizerResult)
        }
      })
      .catch(console.error)
      .finally(() => { setLoading(false) })
  }

  React.useEffect(() => {
    onLoadUsersTotalizer()
  }, [])

  return (
    <Stack direction="row" spacing={1} mx={2} mb={1}>
      <ValueIndicator title="Total de clientes" value={usersTotalizer?.data?.total} entryDirection="right" />

      <ValueIndicator
        title="Novos clientes"
        value={usersTotalizer?.data?.new}
        subvalue={usersTotalizer?.data?.growth}
        descriptionSubvalue="10% de crescimento em relação ao mês anterior"
        entryDirection="left"
        showSubvalue
      />
    </Stack>
  )
}
