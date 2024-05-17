import { useEffect } from 'react'

/**
 * Adds an event listener to window object when the component
 * mounts and removes it when it unmounts.
 * @param type type of event
 * @param listener event handler
 * @param options event options
 */
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
