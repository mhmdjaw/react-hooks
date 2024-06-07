import { useCallback, useEffect, useRef } from 'react'

/**
 * Manages `interval` and handles starting and clearing it.
 * @param callback Function that will be called every delay.
 * @param {number} delay `interval` delay (`ms`) in between `callback` executions.
 * @param {boolean} autoInvoke (Optional) Determines whether the `interval` should start when the component mounts. `false` by default.
 * @param {React.DependencyList} depsList (Optional) List of dependencies used in the `callback` function. Pass state values that the `callback` function might depend on. Empty by default.
 * @returns start and clear functions and function to check the status of the `interval`.
 */
export const useInterval = <T extends Function>(
  callback: T,
  delay: number,
  autoInvoke: boolean = false,
  depsList?: React.DependencyList
) => {
  const intervalRef = useRef<number | null>(null)

  const start = useCallback(
    (...callbackParams: unknown[]) => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
      intervalRef.current = window.setInterval(() => {
        callback(...callbackParams)
      }, delay)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    depsList || [delay]
  )

  const clear = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const isActive = useCallback(() => {
    if (intervalRef.current) {
      return true
    } else {
      return false
    }
  }, [])

  useEffect(() => {
    if (autoInvoke) {
      start()
    }

    return clear
  }, [clear, start, autoInvoke])

  return [start as unknown as T, clear, isActive] as const
}
