import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  IconButton,
} from '@mui/material'
import { isOpenDrawer } from './atoms'
import { GenericState } from '@/presentation/components/atoms'

export type DrawerProps = {
  items: AppNavigation[]
}

export const Drawer: React.FC<DrawerProps> = (props) => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useRecoilState(isOpenDrawer)
  const localStorageAdapter = useRecoilValue(GenericState.localStorageAdapterState)

  const handleLogout = (): void => {
    localStorageAdapter.set('accessToken', undefined)
    navigate('/login')
  }

  return (
    <DrawerMUI
      open={open}
      anchor={isMobile ? 'top' : 'left'}
      onClose={() => {
        setOpen(false)
      }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'background.default',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundImage: 'none',
          },
        },
      }}
    >
      <Box
        sx={{ width: { xs: 'auto', sm: 380 }, backgroundColor: (theme) => `${theme.palette.primary.light}20` }}
        role="presentation"
        onClick={() => {
          setOpen(false)
        }}
      >
        <List disablePadding sx={{ flexDirection: 'column', pt: 4, pb: 2 }}>
          {props.items.map((appNavigate) => (
            <ListItem key={`item-drawer-${appNavigate.icon}`}>
              <ListItemButton
                sx={{ borderRadius: 2 }}
                onClick={() => {
                  navigate(appNavigate.pathTo)
                }}
              >
                <ListItemIcon>
                  <IconButton sx={{ backgroundColor: theme => `${theme.palette.primary.light}20`,  border: 'solid 1px', borderColor: location.endsWith(appNavigate.pathTo) ? 'primary.light' : 'transparent'  }}>
                    <Icon color={location.endsWith(appNavigate.pathTo) ? 'primary' : 'inherit'}>
                      {appNavigate.icon}
                    </Icon>
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={appNavigate.title}
                  secondary={appNavigate.subtitle}
                  slotProps={{
                    primary: { sx: { fontWeight: 600, textTransform: 'uppercase' } },
                    secondary: { sx: { color: 'grey.500', lineHeight: 1 } },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ borderColor: theme => `${theme.palette.primary.light}60` }} />

          <ListItem key={`item-drawer-logout`}>
            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}>
              <ListItemIcon>
                <IconButton sx={{ backgroundColor: theme => `${theme.palette.primary.light}20` }}>
                  <Icon>logout</Icon>
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary="sair"
                secondary="realizar logout do app"
                slotProps={{
                  primary: { sx: { fontWeight: 600, textTransform: 'uppercase' } },
                  secondary: { sx: { color: 'grey.500', lineHeight: 1 } },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </DrawerMUI>
  )
}
