import React from 'react'
import { useRecoilValue } from 'recoil'
import { Icon, IconButton, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material'
import { AttendanceModel, UserModel } from '@/domain/models'
import { GenericState } from '@/presentation/components/atoms'

type AttendanceItemProps = {
  attendance: AttendanceModel
  openDialogWhatsapp: (user: UserModel) => void
  position: number
}

export const AttendanceItem: React.FC<AttendanceItemProps> = (props) => {
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)

  return (
    <ListItem
      key={`attendance-item-${props.attendance.id}`}
      id={`attendance-item-${props.attendance.id}`}
      sx={{
        mt: 1,
        minHeight: 46,
        pr: 1,
        pl: 1,
        gap: 2,
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}30`, height: 30, width: 30, borderRadius: 2 }}
      >
        <Typography sx={{ fontSize: 16 }}>{props.position}</Typography>
      </Stack>

      <Stack sx={{ minWidth: 50 }} justifyContent="center" spacing={0.3}>
        <Typography variant="caption" color="text.disabled" fontSize={9} lineHeight={1} fontFamily="Inter">
          PREVISÃO
        </Typography>
        <Typography
          variant="body2"
          letterSpacing={0.8}
          fontSize={13}
          fontWeight="500"
          lineHeight={1}
          fontFamily="Inter"
        >
          {dateAdapter.format(props.attendance.startPrevision, 'HH:mm')}
        </Typography>
      </Stack>

      <ListItemText
        sx={{ flex: 1 }}
        primary={props.attendance.user.name}
        slotProps={{
          primary: {
            textTransform: 'uppercase',
            id: 'user-name',
            sx: { lineHeight: 1, fontWeight: 500, fontFamily: 'Inter', fontSize: 16 },
          },
        }}
      />

      <Tooltip title="Adicionar na fila" placement="left" arrow>
        <IconButton size="small" edge="end" aria-label="adicioanr na fila">
          <Icon fontSize="small" sx={{ color: 'text.disabled' }}>
            more_vert
          </Icon>
        </IconButton>
      </Tooltip>
    </ListItem>
  )
}
