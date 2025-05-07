import { Typography } from '@mui/material'
import React from 'react'

type TextZoomProps = {
  text: number | string
}

export const TextZoom: React.FC<TextZoomProps> = (props) => {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    setVisible(true)
    const timeout = setTimeout(() => setVisible(false), 300)
    return () => clearTimeout(timeout)
  }, [props.text])

  const zoomStyle = {
    transition: 'transform 0.3s ease-in-out',
    transform: visible ? 'scale(1.4)' : 'scale(1)',
  }
  return (
    <Typography variant="subtitle1" sx={{ ...zoomStyle, lineHeight: 1, fontWeight: '600', fontSize: 14, display: 'inline-block' }}>
      {props.text}
    </Typography>
)
}
