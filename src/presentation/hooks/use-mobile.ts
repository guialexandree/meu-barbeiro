import { useMediaQuery, useTheme } from '@mui/material'

const useMobile = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isPWA = window.matchMedia('(display-mode: standalone)').matches

  const getOS = (): 'android' | 'ios' | 'web' => {
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

    return isAndroid ? 'android' : isIOS ? 'ios' : 'web'
  }

  return { isPWA, isMobile, getOS }
}

export default useMobile
