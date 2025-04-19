import React from 'react'
import { Paper, Skeleton, Slide, Stack, Typography } from '@mui/material'
import { ValueGrowthIndicator } from '../value-growth-indicator'

type ValueIndicatorProps = {
  title: string
  value: string | number
  loading: boolean
  showSubvalue?: boolean
  subvalue?: number
  descriptionSubvalue?: string
  entryDirection: 'up' | 'down' | 'left' | 'right'
}

export const ValueIndicator: React.FC<ValueIndicatorProps> = (props) => {
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
        <Typography variant="caption" sx={{ color: 'grey.400' }}>
          {props.title}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1}>
          {props.loading ? (
            <Skeleton variant="rounded" width={40} height={30} />
          ) : (
            <Typography variant="h4" sx={{ fontWeight: '500', letterSpacing: -3, lineHeight: 1 }}>
              {props.value}
            </Typography>
          )}

          {props.showSubvalue && <ValueGrowthIndicator value={props.subvalue} description={props.descriptionSubvalue} />}
        </Stack>
      </Paper>
    </Slide>
  )
}
