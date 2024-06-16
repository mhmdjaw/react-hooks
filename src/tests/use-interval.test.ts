import { renderHook } from '@testing-library/react'
import { useInterval } from '../hooks/use-interval'
import { act } from 'react'

jest.useFakeTimers()

describe('useInterval', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  it('should call the callback on every delay upon starting interval', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    const [start] = result.current

    act(start)

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(500))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(2500))

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should clear the interval when clear is called', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    const [start, clear] = result.current

    act(start)

    act(() => jest.advanceTimersByTime(3000))

    expect(callback).toHaveBeenCalledTimes(3)

    act(clear)

    act(() => jest.advanceTimersByTime(3000))

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should clear the interval and start another one when start is called again', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    const [start] = result.current

    act(start)

    act(() => jest.advanceTimersByTime(2500))

    expect(callback).toHaveBeenCalledTimes(2)

    act(start)

    act(() => jest.advanceTimersByTime(500))

    expect(callback).toHaveBeenCalledTimes(2)

    act(() => jest.advanceTimersByTime(500))

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should return true when isActive is called and the interval is running, otherwise false', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    const [start, clear, isActive] = result.current

    const isActiveMock = jest.fn(isActive)

    act(start)

    act(isActiveMock)

    expect(isActiveMock).toHaveReturnedWith(true)

    act(() => jest.advanceTimersByTime(2000))

    expect(callback).toHaveBeenCalledTimes(2)

    act(isActiveMock)

    expect(isActiveMock).toHaveReturnedWith(true)

    act(clear)

    act(isActiveMock)

    expect(isActiveMock).toHaveReturnedWith(false)
  })

  it('should auto-invoke the interval on mount if autoInvoke is true', () => {
    const callback = jest.fn()
    renderHook(() => useInterval(callback, 1000, true))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(3000))

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should handle changing dependencies correctly', () => {
    const callback = jest.fn()
    let delay = 1000
    const { result, rerender } = renderHook(({ delay }) => useInterval(callback, delay, false, [delay]), {
      initialProps: { delay }
    })

    const [start] = result.current

    act(start)

    act(() => jest.advanceTimersByTime(2000))

    expect(callback).toHaveBeenCalledTimes(2)

    delay = 2000
    rerender({ delay })

    const [newStart] = result.current

    act(newStart)

    act(() => jest.advanceTimersByTime(1999))

    expect(callback).toHaveBeenCalledTimes(2)

    act(() => jest.advanceTimersByTime(1))

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should call callback with callback params', () => {
    const callbackParams = { testParam: 'test' }
    const callback = jest.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    const [start] = result.current

    act(() => start(callbackParams))

    act(() => jest.advanceTimersByTime(2000))

    expect(callback).toHaveBeenCalledTimes(2)

    expect(callback).toHaveBeenCalledWith(callbackParams)
  })
})
