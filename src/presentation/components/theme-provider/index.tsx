import { theme } from '@/main/configs/theme'
import { ThemeProvider as ThemeProviderMUI } from '@mui/material'
import React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  return (
    <ThemeProviderMUI theme={theme}>
      {props.children}
    </ThemeProviderMUI>
  )
}
