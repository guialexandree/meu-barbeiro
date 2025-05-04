import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Box, Icon, IconButton, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material'
import { UserModel } from '@/domain/models'
import { StatusUser } from '@/presentation/components'
import { useFormat } from '@/presentation/hooks'
import { useNavigate } from 'react-router-dom'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { useSetRecoilState } from 'recoil'

type UserItemProps = {
  user: UserModel
}

export const UserItem: React.FC<UserItemProps> = (props) => {
  const { formatPhoneNumber } = useFormat()
  const navigate = useNavigate()
  const setSelectedUser = useSetRecoilState(State.selectedUserState)

  return (
    <ListItem
      key={`user-item-${props.user.id}`}
      id={`user-item-${props.user.id}`}
      disablePadding
      sx={{
        mt: 1,
        borderRadius: 2,
        pl: 3,
        alignItems: 'stretch',
        backgroundColor: (theme) => `${theme.palette.primary.light}10`,
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <ListItemText
        sx={{ flex: 1, mt: 1 }}
        primary={props.user.name}
        slotProps={{
          primary: {
            textTransform: 'uppercase',
            id: 'user-name',
            sx: { lineHeight: 1, fontWeight: 500, fontFamily: 'Inter' },
          },
        }}
        secondary={
          <Stack alignItems="flex-start">
            <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
              {formatPhoneNumber(props.user.contactNumber.slice(-11))}
            </Typography>

            <StatusUser status={props.user.status as any} />
          </Stack>
        }
      />
      <Stack direction="row" spacing={1} alignItems="center" mr={1}>
        <Tooltip title="Adicionar na fila" placement="left" arrow>
          <IconButton
            size={'small'}
            sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
            edge="end"
            aria-label="adicionar na fila"
            onClick={() => {
              setSelectedUser({ label: props.user.name.toUpperCase(), id: props.user.id })
              navigate('/fila/entrar')
            }}
          >
            <Icon>data_saver_on</Icon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Chamar o WhatsApp" placement="left" arrow>
          <IconButton
            size={'small'}
            sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
            edge="end"
            aria-label="whastapp"
          >
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        sx={{
          p: 1,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: (theme) => `${theme.palette.primary.light}10`,
        }}
      >
        <Tooltip title="Ver detalhes do cliente" placement="left" arrow>
          <IconButton
            size={'small'}
            onClick={() => {
              navigate(`/cliente/${props.user.id}`)
            }}
            edge="end"
            aria-label="detalhes do cliente"
          >
            <Icon>person</Icon>
          </IconButton>
        </Tooltip>
      </Box>
    </ListItem>
  )
}
