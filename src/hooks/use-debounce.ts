import { useCallback, useEffect, useRef } from 'react'

/**
 * Debounces a `callback` delaying its execution time since the last call.
 * @param callback Function to be debounced.
 * @param {number} delay Debounce delay (`ms`) after which the `callback` function will be executed.
 * @param {React.DependencyList} depsList (Optional) List of dependencies used in the `callback` function. Pass state values that the `callback` function might depend on. Empty by default.
 * @returns function that debounces the callback.
 */
export const useDebounce = <T extends Function>(callback: T, delay: number, depsList?: React.DependencyList) => {
  const timeoutRef = useRef<number | null>(null)

  const debounce = useCallback(
    (...callbackParams: unknown[]) => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...callbackParams)
        timeoutRef.current = null
      }, delay)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    depsList || [delay]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [debounce])

  return debounce as unknown as T
}
