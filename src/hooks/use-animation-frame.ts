import { useCallback, useEffect, useRef } from 'react'

export interface CallbackParams {
  timestamp: number
  startTime: number
  complete: (onComplete?: () => void) => void
}

/**
 * Manages `requestAnimationFrame` and handles starting and cancelling it.
 * @param callback Function that will be called when the next frame is available. `timestamp` of `requestAnimationFrame` and `complete` function are passed as parameters.
 * @param {boolean} autoInvoke (Optional) Determines whether the `requestAnimationFrame` should start when the component mounts. `false` by default.
 * @param {React.DependencyList} depsList (Optional) List of dependencies used in the `callback` function. Pass state values that the `callback` function might depend on. Empty by default.
 * @returns start and cancel functions and a function to check the status of the `requestAnimationFrame`.
 */
export const useAnimationFrame = (
  callback: (callbackParams: CallbackParams) => void,
  autoInvoke: boolean = false,
  depsList: React.DependencyList = []
) => {
  const requestAnimationFrameRef = useRef<number | null>(null)

  const start = useCallback(
    () => {
      cancel()
      let startTime: number
      let onCompleteCallback: () => void

      const runAnimation = (timestamp: number) => {
        let complete = false
        callback({
          timestamp,
          startTime,
          complete: (onComplete) => {
            complete = true
            if (onComplete) {
              onCompleteCallback = onComplete
            }
          }
        })
        if (!complete) {
          requestAnimationFrameRef.current = window.requestAnimationFrame((timestamp) => {
            runAnimation(timestamp)
          })
        } else {
          requestAnimationFrameRef.current = null
          onCompleteCallback()
        }
      }

      requestAnimationFrameRef.current = window.requestAnimationFrame((timestamp) => {
        startTime = timestamp
        runAnimation(timestamp)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    depsList
  )

  const cancel = useCallback(() => {
    if (requestAnimationFrameRef.current) {
      window.cancelAnimationFrame(requestAnimationFrameRef.current)
      requestAnimationFrameRef.current = null
    }
  }, [])

  const isActive = useCallback(() => {
    if (requestAnimationFrameRef.current) {
      return true
    } else {
      return false
    }
  }, [])

  useEffect(() => {
    if (autoInvoke) {
      start()
    }

    return cancel
  }, [cancel, start, autoInvoke])

  return [start, cancel, isActive] as const
}
