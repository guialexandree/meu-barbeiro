import React from 'react'

type TimerProps = {
  startDate: Date
  play: boolean
}

const Timer: React.FC<TimerProps> = (props) => {
  const [timer, setTimer] = React.useState(() => {
    const now = new Date()
    return Math.floor((now.getTime() - props.startDate.getTime()) / 1000)
  })

  const interval = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (props.play) {
      interval.current = setInterval(() => {
        const now = new Date()
        const elapsedSeconds = Math.floor((now.getTime() - props.startDate.getTime()) / 1000)
        setTimer(elapsedSeconds)
      }, 1000)
    }

    return () => clearInterval(interval.current as NodeJS.Timeout)
  }, [props.play])

  return timer >= 3600
    ? `${Math.floor(timer / 3600).toString().padStart(2, '0')}:${Math.floor((timer % 3600) / 60).toString().padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`
    : `${Math.floor((timer % 3600) / 60).toString().padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`
}

export default Timer