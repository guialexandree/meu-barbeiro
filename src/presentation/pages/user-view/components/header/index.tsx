import React from 'react'
import { useRecoilValue } from 'recoil'
import { Avatar, Chip, Icon, IconButton, Skeleton, Slide, Stack, Typography, Zoom } from '@mui/material'
import { State } from '@/presentation/pages/user-view/components/atoms'
import { GenericState } from '@/presentation/components/atoms'

export const UserHeader: React.FC = () => {
  const loading = useRecoilValue(State.loadingState)
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)
  const userResult = useRecoilValue(State.userResultState)

  if (loading || !userResult) {
    return (
      <Stack direction="row" spacing={2} width={'100%'}>
        <Slide direction="right" in mountOnEnter unmountOnExit>
          <Skeleton variant="circular" width={80} height={80} />
        </Slide>

        <Slide direction="down" in mountOnEnter unmountOnExit>
          <Stack alignItems="flex-start" spacing={0.7} flex={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5} width="100%">
              <Skeleton variant="rounded" width={120} height={24} sx={{ mt: 2 }} />
            </Stack>

            <Stack pt={0.8} spacing={0.5}>
              <Skeleton variant="rounded" width={72} height={24} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={180} height={12} sx={{ mt: 0.3 }} />
            </Stack>
          </Stack>
        </Slide>
        <Zoom in>
          <Skeleton variant="circular" width={18} height={18} />
        </Zoom>
      </Stack>
    )
  }

  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width={'100%'}
      spacing={2}
    >
      <Avatar
        alt="Imagem do usuário"
        src={`/public/img/avataaars${Math.floor(Math.random() * 7) + 1}.svg`}
        sx={{
          width: 80,
          height: 80,
          border: 'solid 3px',
          borderColor: 'grey.400',
          backgroundColor: '#111111',
          color: 'text.primary',
        }}
      />

      <Stack alignItems="flex-start" spacing={0.7} flex={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5} width="100%">
          <Typography variant="h5" fontWeight={600} lineHeight={1}>
            {userResult.data.name?.toUpperCase()?.split(' ')?.at?.(0)}
          </Typography>
          <IconButton sx={{ backgroundColor: 'background.default' }} edge="end" aria-label="editar">
            <Icon sx={{ fontSize: 16 }}>edit</Icon>
          </IconButton>
        </Stack>
        <Chip
          size="small"
          sx={{ borderRadius: 2, fontSize: 12, color: 'text.secondary' }}
          label={userResult.data.role === 'barber' ? 'BARBEIRO' : 'CLIENTE'}
        />

        <Typography variant="caption" color="text.disabled" lineHeight={1}>
          cadastrado {dateAdapter.format(userResult.data?.createdAt?.toString(), 'DD/MM/YYYY HH:mm')}
        </Typography>
      </Stack>
    </Stack>
  )
}
