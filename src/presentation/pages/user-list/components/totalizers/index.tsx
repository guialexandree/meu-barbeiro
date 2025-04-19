import React from 'react'
import { useRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { ValueIndicator } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'
import { Factories } from '@/main/factories/usecases'

export const Totalizers: React.FC = () => {
  const [usersTotalizer, setUsersTotalizer] = useRecoilState(State.List.usersTotalizerResultState)
  const [loading, setLoading] = useRecoilState(State.List.loadingUsersTotalizerResultState)

  const loadUsersTotalizer = React.useMemo(() => Factories.makeRemoteLoadUsersTotalizer(), [])

  const onLoadUsersTotalizer =() => {
    setLoading(true)
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
      <ValueIndicator loading={loading} title="Total de clientes" value={usersTotalizer?.data?.total} entryDirection="right" />

      <ValueIndicator
        loading={loading}
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
