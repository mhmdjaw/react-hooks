import { renderHook } from '@testing-library/react'
import { CallbackParams, useAnimationFrame } from '../hooks/use-animation-frame'
import { act } from 'react'

/* grab jest from @jest/globals for this test only to use jest alpha version which supports
  the new next frame testing as it's not available in @types/jest */
import { jest } from '@jest/globals'

jest.useFakeTimers()

describe('useAnimationFrame', () => {
  beforeEach(jest.clearAllTimers)

  it('should call callback repeatedly whenever a frame is available', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useAnimationFrame(callback))

    const [start] = result.current

    act(start)

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalled()

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should cancel animation frame when cancel is called', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useAnimationFrame(callback))

    const [start, cancel] = result.current

    act(start)

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalled()

    act(cancel)

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should cancel animation frame when complete function is called and call onComplete if provided', () => {
    let counter = 2
    const onComplete = jest.fn()
    const callback = jest.fn(({ complete }: CallbackParams) => {
      if (counter === 0) {
        complete(onComplete)
      } else {
        counter--
      }
    })
    const { result } = renderHook(() => useAnimationFrame(callback))

    const [start] = result.current

    act(start)

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalledTimes(1)

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalledTimes(2)

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalledTimes(3)

    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('should return true when isActive is called and the animation is running, otherwise false', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useAnimationFrame(callback))

    const [start, cancel, isActive] = result.current

    const isActiveMock = jest.fn(isActive)

    act(start)

    act(isActiveMock)

    expect(isActiveMock).toHaveReturnedWith(true)

    act(jest.advanceTimersToNextFrame)

    act(isActiveMock)

    expect(isActiveMock).toHaveReturnedWith(true)

    act(cancel)

    act(isActiveMock)

    expect(isActiveMock).toHaveReturnedWith(false)
  })

  it('should auto-invoke the animation on mount if autoInvoke is true', () => {
    const callback = jest.fn()
    renderHook(() => useAnimationFrame(callback, true, []))

    expect(callback).not.toHaveBeenCalled()

    act(jest.advanceTimersToNextFrame)
    act(jest.advanceTimersToNextFrame)

    expect(callback).toHaveBeenCalledTimes(2)
  })
})
