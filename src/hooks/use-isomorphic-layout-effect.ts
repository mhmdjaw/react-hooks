import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from '../helpers'

/* If browser doesn't exist (SSR) use useEffect instead of useLayoutEffect */
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
