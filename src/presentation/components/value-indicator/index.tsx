import React from 'react'
import { Chip, Icon, Paper, Skeleton, Slide, Stack, Tooltip, Typography } from '@mui/material'

type ValueIndicatorProps = {
  title: string
  value: string | number
  subvalue?: string
  descriptionSubvalue?: string
  entryDirection: 'up' | 'down' | 'left' | 'right'
  icon: string
}

export const ValueIndicator: React.FC<ValueIndicatorProps> = (props) => {
  const iconValue = +props.value > 0 ? 'trending_up' : 'trending_down'

  return (
    <Slide direction={props.entryDirection} in mountOnEnter unmountOnExit>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1, sm: 2 },
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          maxWidth: 300,
          backgroundColor: 'grey.800',
          border: 'solid 2px',
          borderColor: (theme) => `${theme.palette.primary.main}54`,
        }}
      >
        <Stack direction="row" sx={{ color: 'grey.400' }} alignItems="flex-start" spacing={1}>
          <Icon sx={{ fontSize: { xs: 20, sm: 26 } }}>{props.icon}</Icon>
          <Typography variant="caption">{props.title}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1}>
          {props.value ? (
            <Typography variant="h4" sx={{ fontWeight: '500', letterSpacing: -3, lineHeight: 1 }}>
              {props.value}
            </Typography>
          ) : (
            <Skeleton variant="rounded" width={40} height={30} />
          )}

          {props.subvalue && (
            <Tooltip title={props.descriptionSubvalue}>
              <Chip
                variant="outlined"
                icon={<Icon color="success">{iconValue}</Icon>}
                size="small"
                label={props.subvalue}
                sx={{
                  p: 0,
                  fontSize: 11,
                }}
              />
            </Tooltip>
          )}
        </Stack>
      </Paper>
    </Slide>
  )
}
