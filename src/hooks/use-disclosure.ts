import { useCallback, useState } from 'react'

/**
 * Used to manage `boolean` state and controlled components.
 * @param {boolean} initialState (Optional) Initial `opened` state. Defaults to `false`.
 * @returns Stateful `boolean` value and functions to update it.
 */
export const useDisclosure = (initialState: boolean = false) => {
  const [opened, setOpened] = useState(initialState)

  const open = useCallback(() => {
    setOpened((isOpened) => (!isOpened ? true : isOpened))
  }, [])

  const close = useCallback(() => {
    setOpened((isOpened) => (isOpened ? false : isOpened))
  }, [])

  const toggle = useCallback(() => {
    setOpened((isOpened) => !isOpened)
  }, [])

  return [opened, { open, close, toggle }] as const
}
