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
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: 'Inter',
          fontWeight: 900,
          fontSize: 20,
          lineHeight: 1,
          letterSpacing: 0.5,
        },
        h2: {
          fontFamily: 'Inter',
          fontWeight: 900,
          fontSize: 18,
          lineHeight: 1,
          letterSpacing: 0.5,
        },
      },
    },
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  }
})
