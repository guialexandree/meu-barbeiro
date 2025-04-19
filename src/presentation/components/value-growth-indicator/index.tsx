import React from 'react'
import { Chip, Icon, Tooltip } from '@mui/material'

type ValueGrowthIndicatorProps = {
  value?: number
  description?: string
}

export const ValueGrowthIndicator: React.FC<ValueGrowthIndicatorProps> = (props) => {
  let iconValue = (props.value || 0) > 0 ? 'trending_up' : 'trending_down'
  iconValue = props.value === 0 ? 'trending_flat' : iconValue

  let colorValue: any = (props.value || 0) > 0 ? 'success' : 'error'
  colorValue = props.value === 0 ? 'info' : colorValue

  return (
    <Tooltip title={props.description}>
      <Chip
        icon={<Icon color={colorValue}>{iconValue}</Icon>}
        size="small"
        color={colorValue}
        label={`${props.value} %`}
        sx={{
          fontFamily: 'Inter',
          p: 0,
          fontSize: 11,
          color: `${colorValue}.main`,
          borderRadius: 3,
          backgroundColor: (theme) => `${theme.palette.success.main}20`,
        }}
      />
    </Tooltip>
  )
}
