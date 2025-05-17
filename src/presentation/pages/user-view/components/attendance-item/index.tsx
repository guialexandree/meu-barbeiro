import React from 'react'
import { useRecoilValue } from 'recoil'
import { ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { AttendanceModel } from '@/domain/models'
import { GenericState } from '@/presentation/components/atoms'
import { Timer } from '@/presentation/components'

type AttendanceItemProps = {
  attendance: AttendanceModel
}

export const AttendanceItem: React.FC<AttendanceItemProps> = (props) => {
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)

  return (
    <ListItem
      key={`attendance-item-${props.attendance.id}`}
      id={`attendance-item-${props.attendance.id}`}
      sx={{
        minHeight: 46,
        pr: 1.5,
        pl: 1,
        pb: 1.5,
        gap: 2,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}20`, p: 0.8, borderRadius: 2 }}
      >
        <Typography sx={{ fontSize: 10, letterSpacing: 0.3, fontWeight: '700', lineHeight: 1 }}>
          {dateAdapter.format(props.attendance.createdAt, 'MMM').toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: 13, lineHeight: 1, letterSpacing: 0.5, fontWeight: '700' }}>
          {dateAdapter.format(props.attendance.createdAt, 'DD').toUpperCase()}
        </Typography>
      </Stack>

      <Typography
        sx={{ color: (theme) => `${theme.palette.primary.light}90`, mr: 1 }}
        fontSize={14}
        lineHeight={1}
        fontFamily="Inter"
      >
        {dateAdapter.format(props.attendance.createdAt, 'ddd').toUpperCase()}
      </Typography>

      <Stack sx={{ minWidth: 50, flex: 1 }} justifyContent="center" spacing={0.5}>
        <Typography variant="caption" color="text.disabled" fontSize={10} lineHeight={1} fontFamily="Inter">
          INICIOU
        </Typography>
        <Typography
          variant="body2"
          letterSpacing={1}
          fontSize={15}
          fontWeight="500"
          lineHeight={1}
          fontFamily="Inter"
        >
          {dateAdapter.format(props.attendance.startPrevision, 'HH:mm')}
        </Typography>
      </Stack>

      {props.attendance.finishedAt && (
        <Stack sx={{ minWidth: 50, flex: 1 }} justifyContent="center" spacing={0.5}>
          <Typography variant="caption" color="text.disabled" fontSize={10} lineHeight={1} fontFamily="Inter">
            FINALIZOU
          </Typography>
          <Typography
            variant="body2"
            letterSpacing={1}
            fontSize={15}
            fontWeight="500"
            lineHeight={1}
            fontFamily="Inter"
          >
            {dateAdapter.format(props.attendance.finishedAt!, 'HH:mm')}
          </Typography>
        </Stack>
      )}

      {props.attendance.status === 'attending' && (
        <Stack sx={{ minWidth: 50, flex: 1 }} justifyContent="center" spacing={0.5}>
          <Typography variant="caption" color="text.disabled" fontSize={10} lineHeight={1} fontFamily="Inter">
            DURAÇÃO
          </Typography>
          <Typography
            variant="body2"
            letterSpacing={0.8}
            fontSize={15}
            fontWeight="500"
            lineHeight={1}
            fontFamily="Inter"
          >
            <Timer play startDate={new Date(props.attendance.startedAt!)} />
            {/* {dateAdapter.format(props.attendance.finishedAt!, 'HH:mm')} */}
          </Typography>
        </Stack>
      )}

      <ListItemText
        sx={{ flex: 0.7, textAlign: 'right' }}
        primary={`R$ ${props.attendance.services.reduce((acc, service) => acc + +service.price, 0)}`}
        slotProps={{
          primary: {
            textTransform: 'uppercase',
            id: 'user-name',
            sx: { lineHeight: 1, fontWeight: 500, fontFamily: 'Inter', fontSize: 16, color: 'text.secondary' },
          },
        }}
      />
    </ListItem>
  )
}
