import { useCallback, useEffect, useRef } from 'react'

/**
 * Manages `timeout` and handles starting and clearing it.
 * @param callback Function that will be called after the timer elapses.
 * @param {number} delay `timeout` delay (`ms`) after which the `callback` function will be executed.
 * @param {boolean} autoInvoke (Optional) Determines whether the `timeout` should start when the component mounts. `false` by default.
 * @param {React.DependencyList} depsList (Optional) List of dependencies used in the `callback` function. Pass state values that the `callback` function might depend on.
 * @returns start and clear functions.
 */
export const useTimeout = (
  callback: (...callbackParams: unknown[]) => void,
  delay: number,
  autoInvoke: boolean = false,
  depsList?: React.DependencyList
) => {
  const timeoutRef = useRef<number | null>(null)

  const start = useCallback(
    (...callbackParams: unknown[]) => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(callbackParams)
        timeoutRef.current = null
      }, delay)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    depsList || [delay]
  )

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    if (autoInvoke) {
      start()
    }

    return clear
  }, [clear, start, autoInvoke])

  return [start, clear] as const
}
