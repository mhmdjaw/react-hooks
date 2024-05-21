import { useCallback, useEffect, useState } from 'react'
import { useWindowEvent } from './use-window-event'

interface ScrollPosition {
  x: number
  y: number
}

const getScrollPosition = () => {
  return typeof window !== 'undefined'
    ? { x: window.scrollX || window.pageXOffset, y: window.scrollY || window.pageYOffset }
    : { x: 0, y: 0 }
}

const scrollTo = ({ x, y }: Partial<ScrollPosition>) => {
  if (typeof window !== 'undefined') {
    const scrollOptions: ScrollToOptions = { behavior: 'smooth' }

    if (typeof x === 'number') {
      scrollOptions.left = x
    }

    if (typeof y === 'number') {
      scrollOptions.top = y
    }

    window.scrollTo(scrollOptions)
  }
}

/**
 * Returns current `window` scroll position and a function to scroll to a given position.
 * @param {boolean} isSubscribed (Optional) Activate or cancel subscription. Set to `false` to stop getting updates.
 * @returns Current `window` scroll position and a function to scroll smoothly to a given position.
 */
export function useWindowScroll(isSubscribed: boolean = true) {
  const [windowPosition, setWindowPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  const setPosition = useCallback(() => {
    isSubscribed && setWindowPosition(getScrollPosition())
  }, [isSubscribed])

  useWindowEvent('scroll', setPosition)
  useWindowEvent('resize', setPosition)

  useEffect(setPosition, [setPosition])

  return [windowPosition, scrollTo] as const
}
