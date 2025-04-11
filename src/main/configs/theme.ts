import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2c82d8',
    },
    secondary: {
      main: '#ffa726',
    },
    background: {
      default: '#303030',
      paper: '#151515',
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
  }
})
