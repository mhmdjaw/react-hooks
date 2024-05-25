import { useCallback, useState } from 'react'

/**
 * Resets the state of a child component along with all its children.
 *
 * Note that it does not reset the state of the current component.
 *
 * @param {string} prefixKey In case multiple instances of this hook are being used to reset sibling components. Pass a unique prefix value to avoid key collisions.
 * @returns Reset value that must be passed to the component `key` and a reset function to trigger the reset.
 */
export const useResetChild = (prefixKey: string = 'reset_key') => {
  const [timestamp, setTimestamp] = useState(Date.now())

  const reset = useCallback(() => {
    setTimestamp(Date.now())
  }, [])

  return [`${prefixKey}_${timestamp.toString()}`, reset] as const
}
