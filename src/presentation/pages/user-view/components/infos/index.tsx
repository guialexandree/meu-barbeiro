import React from 'react'
import { useRecoilValue } from 'recoil'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Fade, Icon, IconButton, Paper, Skeleton, Slide, Stack, Typography } from '@mui/material'
import { State } from '@/presentation/pages/user-view/components/atoms'
import { useFormat } from '@/presentation/hooks'

export const UserInfo: React.FC = () => {
  const { formatPhoneNumber } = useFormat()
  const userResult = useRecoilValue(State.userState)

  return (
    <Fade in timeout={1000}>
      <Stack sx={{ backgroundColor: 'transparent', width: '100%', py: 2 }} spacing={1}>
        <Typography color="primary.main" variant="h2" lineHeight={1} fontSize={14}>
          INFORMAÇÕES
        </Typography>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            mt: 1,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <Icon sx={{ fontSize: 24, color: 'text.disabled' }} >
            phone
          </Icon>
          {userResult?.contactNumber ? (
            <Typography fontSize={18} fontWeight={'400'} mr="auto" color="text.secondary" lineHeight={1}>
              {formatPhoneNumber(userResult?.contactNumber?.slice(-11))}
            </Typography>
          ) : (
            <Skeleton variant="rounded" width={135} height={18} sx={{ mr: 'auto' }} />
          )}

          <Stack direction="row" alignItems="center" spacing={2}>
            <Slide in direction="left" unmountOnExit mountOnEnter>
              <IconButton sx={{ p: 0.4 }} edge="end" aria-label="copiar">
                <Icon sx={{ fontSize: 18 }} color="action">
                  content_copy
                </Icon>
              </IconButton>
            </Slide>
            <Slide in direction="left" unmountOnExit mountOnEnter>
              <IconButton sx={{ p: 0.4 }} id="go-to-list-action">
                <WhatsAppIcon />
              </IconButton>
            </Slide>
          </Stack>
        </Paper>
      </Stack>
    </Fade>
  )
}
