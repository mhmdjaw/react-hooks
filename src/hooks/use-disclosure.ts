import { useCallback, useState } from 'react'

/**
 * used to manage boolean state and controlled components
 * @param {boolean} initialState initial opened state
 * @returns stateful boolean value and functions to update it
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
  }, [close, open, opened])

  return [opened, { open, close, toggle }] as const
}
