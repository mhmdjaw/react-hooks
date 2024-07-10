import { useCallback, useState } from 'react'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

/**
 * Listens and checks media query matches.
 * @param {string} query Media query string.
 * @param {boolean} initialValue (Optional) Initial value of the match query state. Defaults to `false`.
 * @returns `true` if the media query is matched, and `false` if it's not.
 */
export function useMediaQuery(query: string, initialValue?: boolean) {
  const [matches, setMatches] = useState(initialValue)

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if ('matchMedia' in window) {
      const matchQueryList = window.matchMedia(query)
      setMatches(matchQueryList.matches)
      matchQueryList.addEventListener('change', handleChange)

      return () => {
        matchQueryList.removeEventListener('change', handleChange)
      }
    }

    return undefined
  }, [query, handleChange])

  return matches
}
