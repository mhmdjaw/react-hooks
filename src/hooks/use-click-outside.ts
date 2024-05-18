import { useEffect, useRef } from 'react'

/**
 * Detects click or another specified event outside of given element or list of elements.
 * @param handler function called when outside click is detected
 * @param refs optional list of ref objects for elements that should not trigger outside click
 * @param event optional event to replace the default "click" event
 * @returns ref object that must be passed to the element to detect clicks outside of it
 */
export const useClickOutside = <T extends HTMLElement>(
  handler: () => void,
  refs?: (React.RefObject<HTMLElement> | null)[] | null,
  event?: keyof DocumentEventMap
) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const listener = (event: Event) => {
      const { target } = event ?? {}
      if (Array.isArray(refs)) {
        const shouldTrigger = refs.every((ref) => ref?.current && !ref.current.contains(target as Node))
        shouldTrigger && handler()
      } else if (ref.current && !ref.current.contains(target as Node)) {
        handler()
      }
    }

    document.addEventListener(event || 'click', listener)

    return () => document.removeEventListener(event || 'click', listener)
  }, [ref, handler, refs])

  return ref
}
