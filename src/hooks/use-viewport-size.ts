import { useCallback, useEffect, useState } from 'react'
import { useWindowEvent } from './use-window-event'

const eventListenerOptions = {
  passive: true
}

/**
 * Returns current viewport's width and height. It updates on resize and when the orientation changes.
 * @returns width and height
 */
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
