import { useCallback, useEffect, useState } from 'react'
import { useWindowEvent } from './use-window-event'

const eventListenerOptions = {
  passive: true
}

export const useViewportSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  const setSize = useCallback(() => {
    setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 })
  }, [])

  useWindowEvent('resize', setSize, eventListenerOptions)

  useWindowEvent('orientationchange', setSize, eventListenerOptions)

  useEffect(setSize, [])

  return windowSize
}
