import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade, Icon, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import { State } from '@/presentation/pages/user-view/components/atoms'
import { useFormat } from '@/presentation/hooks'

export const UserInfo: React.FC = () => {
  const { formatPhoneNumber } = useFormat()
  const userResult = useRecoilValue(State.userResultState)

  return (
    <Fade in timeout={1000}>
      <Stack sx={{ backgroundColor: 'transparent', width: '100%', mt: 2, py: 2 }}>
        <Typography variant="h6" fontSize={16} color="primary.main" fontWeight={600} lineHeight={1}>
          INFORMAÇÕES
        </Typography>
        <Stack alignItems="flex-start" mt={1}>
          <Stack direction="column" alignItems="flex-start" spacing={0.5} mt={1}>
            <Stack direction="row" alignItems="center" spacing={0.6}>
              <Icon sx={{ fontSize: 14 }}>phone</Icon>
              <Typography variant="body2" fontSize={14} fontWeight={600} lineHeight={1}>
                Telefone
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.4}>
              {userResult ? (
                <Typography variant="body2" fontSize={14} color="text.secondary" lineHeight={1}>
                  {formatPhoneNumber(userResult?.data.contactNumber.slice(-11))}
                </Typography>
              ) : (
                <Skeleton variant="text" width={132} height={21} sx={{ borderRadius: 4 }} />
              )}

              <IconButton
                size="small"
                sx={{ p: 0.4, backgroundColor: 'background.default' }}
                edge="end"
                aria-label="copiar"
              >
                <Icon sx={{ fontSize: 16 }}>content_copy</Icon>
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Fade>
  )
}
