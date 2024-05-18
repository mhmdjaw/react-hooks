import { useEffect, useMemo, useRef } from 'react'

type ObserverHandler = (contectRect: Omit<DOMRectReadOnly, 'toJSON'>) => void

/**
 * Detects changes to the dimensions of an Element with ResizeObserver.
 * @param {ObserverHandler} handler function called when the size of the element observed changes. Content Rect values are passed as an object parameter.
 * @param {ResizeObserverOptions} options ResizeObserver options.
 * @returns ref object that must be passed to the element whose size is being observed.
 */
export const useResizeObserver = <T extends HTMLElement>(handler: ObserverHandler, options?: ResizeObserverOptions) => {
  const frameID = useRef(0)
  const ref = useRef<T>(null)

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver((entries) => {
            const entry = entries[0]

            if (entry) {
              cancelAnimationFrame(frameID.current)

              frameID.current = requestAnimationFrame(() => {
                if (ref.current) {
                  handler(entry.contentRect)
                }
              })
            }
          })
        : null,
    []
  )

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current, options)
    }

    return () => {
      observer?.disconnect()

      if (frameID.current) {
        cancelAnimationFrame(frameID.current)
      }
    }
  }, [ref.current])

  return ref
}
