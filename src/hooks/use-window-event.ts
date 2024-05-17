import { useEffect } from 'react'

export function useWindowEvent<T extends keyof WindowEventMap>(
  type: T,
  listener: (this: Window, ev: WindowEventMap[T]) => unknown,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(type, listener, options)
    return () => window.removeEventListener(type, listener, options)
  }, [type, listener])
}
