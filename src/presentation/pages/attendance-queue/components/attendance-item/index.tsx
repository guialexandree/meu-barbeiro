import React from 'react'
import { useRecoilValue } from 'recoil'
import { Divider, Icon, IconButton, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material'
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
      disablePadding
      sx={{
        mt: 1,
        minHeight: 40,
        pr: 1,
        gap: 1,
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: (theme) => `${theme.palette.primary.light}10`,
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}20`, height: 40, width: 36 }}
      >
        <Typography variant="h1" color='primary.light'>{props.position}</Typography>
      </Stack>

      <Stack sx={{ minWidth: 50 }} alignItems="center" justifyContent="center">
        <Typography variant='caption' color="text.secondary" fontSize={8} lineHeight={1} fontFamily="Inter">
          PREVISÃO
        </Typography>
        <Typography variant="body2" letterSpacing={0.8}  fontSize={14} fontWeight={900} fontFamily="Inter">
          {dateAdapter.format(props.attendance.startPrevision, 'HH:mm')}
        </Typography>

      </Stack>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      <ListItemText
        sx={{ flex: 1, mt: 0.5 }}
        primary={props.attendance.user.name}
        slotProps={{
          primary: {
            textTransform: 'uppercase',
            id: 'user-name',
            sx: { lineHeight: 1, fontWeight: 500, fontFamily: 'Inter' },
          },
        }}
      />

      <Tooltip title="Adicionar na fila" placement="left" arrow>
        <IconButton
          size='small'
          sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
          edge="end"
          aria-label="adicioanr na fila"
        >
          <Icon fontSize="small">more_vert</Icon>
        </IconButton>
      </Tooltip>
    </ListItem>
  )
}
