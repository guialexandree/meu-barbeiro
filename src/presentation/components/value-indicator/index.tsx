import React from 'react'
import { Chip, Icon, Paper, Skeleton, Slide, Stack, Tooltip, Typography } from '@mui/material'

type ValueIndicatorProps = {
  title: string
  value: string | number
  subvalue?: string
  descriptionSubvalue?: string
  entryDirection: 'up' | 'down' | 'left' | 'right'
}

export const ValueIndicator: React.FC<ValueIndicatorProps> = (props) => {
  const iconValue = +props.value > 0 ? 'trending_up' : 'trending_down'

  return (
    <Slide direction={props.entryDirection} in mountOnEnter unmountOnExit>
      <Paper
        variant="elevation"
        elevation={0}
        sx={{
          py: { xs: 1, sm: 2 },
          px: { xs: 2 },
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          maxWidth: 300,
        }}
      >
        <Typography variant="caption" sx={{ color: 'grey.400' }}>{props.title}</Typography>

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
                icon={<Icon color="success">{iconValue}</Icon>}
                size="small"
                color='success'
                label={props.subvalue}
                sx={{
                  fontFamily: 'Inter',
                  p: 0,
                  fontSize: 11,
                  color: 'success.main',
                  borderRadius: 3,
                  backgroundColor: theme => `${theme.palette.success.main}20`,
                }}
              />
            </Tooltip>
          )}
        </Stack>
      </Paper>
    </Slide>
  )
}
