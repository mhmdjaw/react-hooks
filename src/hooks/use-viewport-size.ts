import { useCallback, useEffect, useState } from 'react'
import { useWindowEvent } from './use-window-event'
import { useDebounce } from './use-debounce'

const eventListenerOptions = {
  passive: true
}

/**
 * Returns current viewport's "`width`" and "`height`". It updates on `resize` and `orientationchange`.
 * @param {boolean} debounce (Optional) Debounce updating the size. Set to `false` to disable debouncing. `true` by default for optimization.
 * @returns "`width`" and "`height`"
 */
export const useViewportSize = (debounce: boolean = true) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  const setSize = useCallback(() => {
    setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 })
  }, [])

  // debounce to avoid too much unnecessary rerenders
  const debounceResize = useDebounce(setSize, 50, [setSize])

  const resize = debounce ? debounceResize : setSize

  useWindowEvent('resize', resize, eventListenerOptions)

  useWindowEvent('orientationchange', resize, eventListenerOptions)

  useEffect(setSize, [setSize])

  return windowSize
}
