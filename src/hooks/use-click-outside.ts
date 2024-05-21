import { useEffect, useRef } from 'react'

/**
 * Detects `click` or another specified event outside of a given element or list of elements.
 * @param handler Function called when outside click is detected.
 * @param refs Optional list of `ref` objects for elements that should not trigger outside click.
 * @param event Optional event to replace the default `click` event.
 * @returns `ref` Object that must be passed to the element to detect clicks outside of it.
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
  }, [ref, refs, handler, event])

  return ref
}
