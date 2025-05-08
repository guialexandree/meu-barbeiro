import React from 'react'
import { Menu as MenuMUI } from '@mui/material'

type MenuProps = {
  id: string
  anchorEl: HTMLElement | null
  children: React.ReactNode
  onClose: VoidFunction
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom' | number
    horizontal: 'left' | 'center' | 'right' | number
  }
}

export const Menu: React.FC<MenuProps> = (props) => {
  return (
    <MenuMUI
      id="basic-menu"
      anchorEl={props.anchorEl}
      anchorOrigin={props.anchorOrigin || {
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!props.anchorEl}
      onClose={props.onClose}
      slotProps={{
        root: {
          sx: {},
        },
        list: {
          dense: true,
          sx: {
            color: 'grey.900',
          },
        },
        paper: {
          sx: {
            backgroundColor: (theme) => `${theme.palette.grey[200]}`,
          },
        },
      }}
    >
      {props.children}
    </MenuMUI>
  )
}
