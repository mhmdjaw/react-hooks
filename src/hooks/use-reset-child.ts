import { useCallback, useState } from 'react'

/**
 * Resets the state of a child component along with all its children.
 * @returns Reset value given to the component key and a reset function to trigger the reset.
 */
export const useResetChild = () => {
  const [timestamp, setTimestamp] = useState(Date.now())

  const reset = useCallback(() => {
    setTimestamp(Date.now())
  }, [])

  return [timestamp.toString(), reset] as const
}
