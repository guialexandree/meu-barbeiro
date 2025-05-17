import React from 'react'
import { useRecoilValue } from 'recoil'
import { Avatar, Chip, Icon, IconButton, Skeleton, Slide, Stack, Typography, Zoom } from '@mui/material'
import { State } from '@/presentation/pages/user-view/components/atoms'

export const UserHeader: React.FC = () => {
  const loading = useRecoilValue(State.loadingState)
  const userResult = useRecoilValue(State.userState)

  if (loading || !userResult) {
    return (
      <Stack direction="row" spacing={2} width={'100%'}>
        <Zoom in mountOnEnter unmountOnExit>
          <Skeleton variant="circular" width={100} height={100} />
        </Zoom>

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
      justifyContent="space-between"
      alignItems="center"
      width={'100%'}
      spacing={1}
      position="relative"
    >
      <Avatar
        alt="Imagem do usuário"
        src={`/public/img/avataaars${Math.floor(Math.random() * 7) + 1}.svg`}
        sx={{
          width: 100,
          height: 100,
          border: 'solid 2px',
          borderColor: 'grey.400',
          backgroundColor: '#111111',
          color: 'text.primary',
        }}
      />

      <Stack direction="row" alignItems="center" spacing={0.7} flex={1}>
        {userResult.role === 'barber' && (
          <Chip
            size="small"
            sx={{ borderRadius: 2, fontSize: 12 }}
            label={userResult.role === 'barber' ? 'BARBEIRO' : 'CLIENTE'}
            color="secondary"
          />
        )}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5} width="100%">
          <Typography variant="h1">{userResult.name.toUpperCase()?.split(' ')?.at?.(0)}</Typography>
        </Stack>
      </Stack>
      <IconButton
        sx={{ backgroundColor: 'background.default', position: 'absolute', top: 0, right: 0 }}
        edge="end"
        aria-label="editar"
      >
        <Icon sx={{ fontSize: 16 }}>edit</Icon>
      </IconButton>
    </Stack>
  )
}
