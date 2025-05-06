import React from 'react'
import { Divider, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { AttendanceModel, UserModel } from '@/domain/models'
import { AttendanceActions } from '../attendance-actions'

type AttendanceItemProps = {
  attendance: AttendanceModel
  openDialogWhatsapp: (user: UserModel) => void
}

export const AttendanceItem: React.FC<AttendanceItemProps> = (props) => {
  const onOpenDialogWhatsapp = React.useCallback(() => {
    window.open(`https://api.whatsapp.com/send?phone=55${props.attendance.user.contactNumber.replace(/\D/g, '')}`, '_blank')
  }, [])

  return (
    <ListItem
      key={`attendance-item-${props.attendance.id}`}
      id={`attendance-item-${props.attendance.id}`}
      sx={{
        mt: 1,
        borderRadius: 2,
        backgroundColor: (theme) => `${theme.palette.primary.light}10`,
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <Stack mt={0.5} alignItems="center" pl={1}>
        <Typography variant="body2" color="text.primary" fontSize={14} fontWeight={900} fontFamily="Inter">
          14:50
        </Typography>
        <Typography variant="caption" color="text.secondary" fontSize={11} fontFamily="Inter" textAlign="center">
          R$ 50
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
        secondary={
          <Stack alignItems="flex-start">
            <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
              {props.attendance.services
                .map((attendanceService) => attendanceService.service.description.toUpperCase())
                .join(' + ')}
            </Typography>
          </Stack>
        }
      />

      <AttendanceActions openDialogWhatsapp={onOpenDialogWhatsapp} />
    </ListItem>
  )
}
