import { renderHook, act } from '@testing-library/react'
import { useTimeout } from '../hooks/use-timeout'

jest.useFakeTimers()

describe('useTimeout', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  it('should call the callback after the delay', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useTimeout(callback, 1000))

    const [start] = result.current

    act(start)

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1000))

    expect(callback).toHaveBeenCalled()
  })

  it('should clear the timeout when clear is called', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useTimeout(callback, 1000))

    const [start, clear] = result.current

    act(start)

    act(clear)

    act(() => jest.advanceTimersByTime(1000))

    expect(callback).not.toHaveBeenCalled()
  })

  it('should clear the timeout and start another one when start is called again', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useTimeout(callback, 1000))

    const [start] = result.current

    act(start)

    act(() => jest.advanceTimersByTime(500))

    expect(callback).not.toHaveBeenCalled()

    act(start)

    act(() => jest.advanceTimersByTime(600))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(400))

    expect(callback).toHaveBeenCalled()
  })

  it('should auto-invoke the timeout on mount if autoInvoke is true', () => {
    const callback = jest.fn()
    renderHook(() => useTimeout(callback, 1000, true))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1000))

    expect(callback).toHaveBeenCalled()
  })

  it('should handle changing dependencies correctly', () => {
    const callback = jest.fn()
    let delay = 1000
    const { result, rerender } = renderHook(({ delay }) => useTimeout(callback, delay, false, [delay]), {
      initialProps: { delay }
    })

    const [start] = result.current

    act(start)

    act(() => jest.advanceTimersByTime(500))

    expect(callback).not.toHaveBeenCalled()

    delay = 2000
    rerender({ delay })
    const [newStart] = result.current

    act(newStart)

    act(() => jest.advanceTimersByTime(1999))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))

    expect(callback).toHaveBeenCalled()
  })

  it('should handle changing dependencies with autostart', () => {
    const callback = jest.fn()
    let delay = 1000
    const { rerender } = renderHook(({ delay }) => useTimeout(callback, delay, true, [delay]), {
      initialProps: { delay }
    })

    act(() => jest.advanceTimersByTime(500))

    expect(callback).not.toHaveBeenCalled()

    delay = 2000
    rerender({ delay })

    act(() => jest.advanceTimersByTime(1999))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))

    expect(callback).toHaveBeenCalled()
  })

  it('should call callback with callback params', () => {
    const callbackParams = { testParam: 'test' }
    const callback = jest.fn()
    const { result } = renderHook(() => useTimeout(callback, 1000))

    const [start] = result.current

    act(() => start(callbackParams))

    act(() => jest.advanceTimersByTime(1000))

    expect(callback).toHaveBeenCalledWith(callbackParams)
  })
})
