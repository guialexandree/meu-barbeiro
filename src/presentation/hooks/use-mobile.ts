const useMobile = () => {
  const isPWA = () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    return isStandalone
  }

  const getOS = () : 'android' | 'ios' | 'web' => {
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

    return isAndroid ? 'android' : isIOS ? 'ios' : 'web'
  }

  return { isPWA, getOS }
}

export default useMobile
