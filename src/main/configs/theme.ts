import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#569bdf',
      main: '#2c82d8',
      dark: '#1e5b97',
    },
    secondary: {
      light: '#ffa733',
      main: '#ff9100',
      dark: '#b26500',
    },
    background: {
      default: '#1e1e1e',
      paper: '#252525',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
           fontFamily: 'Inter',
           borderRadius: 8,
        },
      },
    },
  }
})
