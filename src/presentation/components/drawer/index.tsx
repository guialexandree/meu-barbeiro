import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AppNavigation } from '@/main/configs'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as DrawerMUI,
  Icon,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material'
import { isOpenDrawer } from './atoms'
import * as GenericState from '@/presentation/components/atoms'

export type DrawerProps = {
  items: AppNavigation[]
}

export const Drawer: React.FC<DrawerProps> = (props) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useRecoilState(isOpenDrawer)
  const localStorageAdapter = useRecoilValue(GenericState.localStorageAdapterState)

  const handleLogout = (): void => {
    localStorageAdapter.set('accessToken', undefined)
    navigate('/login')
  }

  const DrawerList = (): React.ReactNode => (
    <Box
      sx={{ width: { xs: 'auto', sm: 380 } }}
      role="presentation"
      onClick={() => {
        setOpen(false)
      }}
    >
      <List disablePadding sx={{ flexDirection: 'column', py: 4 }}>
        {props.items.map((appNavigate) => (
          <ListItem key={`item-drawer-${appNavigate.icon}`}>
            <ListItemButton
              onClick={() => {
                navigate(appNavigate.pathTo)
              }}
            >
              <ListItemIcon>
                <Icon>{appNavigate.icon}</Icon>
              </ListItemIcon>
              <ListItemText
                primary={appNavigate.title}
                secondary={appNavigate.subtitle}
                slotProps={{
                  secondary: { sx: { color: 'grey.600', lineHeight: 1 } },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider />

        <ListItem key={`item-drawer-logout`}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Icon>logout</Icon>
            </ListItemIcon>
            <ListItemText
              primary="sair"
              secondary="realizar logout do app"
              slotProps={{
                secondary: { sx: { color: 'grey.600', lineHeight: 1 } },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <DrawerMUI
      open={open}
      anchor={isMobile ? 'top' : 'left'}
      onClose={() => {
        setOpen(false)
      }}
    >
      <DrawerList />
    </DrawerMUI>
  )
}
