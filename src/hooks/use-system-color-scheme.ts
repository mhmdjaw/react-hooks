import { useEffect, useState } from 'react'

const query = '(prefers-color-scheme: dark)'

/**
 * Returns current system color scheme. Updates on change.
 * @returns "dark" or "light".
 */
export const useSystemColorScheme = () => {
  const [colorScheme, setColorScheme] = useState('light')

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light')
    }

    window.matchMedia(query).addEventListener('change', listener)
    return () => window.matchMedia(query).removeEventListener('change', listener)
  }, [])

  return colorScheme
}
