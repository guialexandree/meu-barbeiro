import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { Box, Button, List as ListMUI, Stack, Typography } from '@mui/material'
import { PageLoader } from '@/presentation/components'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'

type ListProps = {
  id: string
  onReload: VoidFunction
  listState: RecoilState<{
    loading: boolean
    noResults: boolean
    error: string
  }>
  messagesStates: {
    noResults: string
    error: string
  }
  children: React.ReactNode
}

export const List: React.FC<ListProps> = (props) => {
  const [listState, setListState] = useRecoilState(props.listState)

  if (listState.loading) {
    return <PageLoader loading />
  }

  if (listState.error) {
    return (
      <Stack id="error-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={errorListImg} alt={props.messagesStates.error} width={180} height={180} />
        <Typography variant="h6" align="center">
          {props.messagesStates.error}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          id="reload-users"
          onClick={() => {
            setListState((current) => ({ ...current, error: '' }))
            props.onReload()
          }}
        >
          tentar novamente
        </Button>
      </Stack>
    )
  }

  if (listState.noResults) {
    return (
      <Stack id="no-results-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} px={2} alignItems="center" spacing={1}>
        <Box component="img" src={emptyListImg} alt={props.messagesStates.noResults} width={160} height={160} />
        <Typography variant="h6" align="center">
          {props.messagesStates.noResults}
        </Typography>
        <Button id="list-reset-filters-action" variant="outlined" color="primary">
          remover filtros
        </Button>
      </Stack>
    )
  }

  return (
    <Box mx={2}>
      <ListMUI dense disablePadding id={props.id}>
        {props.children}
      </ListMUI>
    </Box>
  )
}
