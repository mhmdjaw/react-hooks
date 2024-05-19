import { useCallback, useEffect, useState } from 'react'
import { useWindowEvent } from './use-window-event'

const eventListenerOptions = {
  passive: true
}

/**
 * Returns current viewport's width and height. It updates on resize and when the orientation changes.
 * @param {boolean} isSubscribed (Optional) Activate or cancel subscription. Set to false to stop getting updates.
 * @returns width and height
 */
export const useViewportSize = (isSubscribed: boolean = true) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  const setSize = useCallback(() => {
    isSubscribed && setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 })
  }, [isSubscribed])

  useWindowEvent('resize', setSize, eventListenerOptions)

  useWindowEvent('orientationchange', setSize, eventListenerOptions)

  useEffect(setSize, [setSize])

  return windowSize
}
