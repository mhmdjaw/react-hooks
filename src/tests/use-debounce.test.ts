import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../hooks/use-debounce'

jest.useFakeTimers()

describe('useDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  it('should call the callback after the delay', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 1000))

    const debounce = result.current

    act(debounce)

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1000))

    expect(callback).toHaveBeenCalled()
  })

  it('should debounce the callback on subsequent executions', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 1000))

    const debounce = result.current

    act(debounce)

    act(() => jest.advanceTimersByTime(500))

    expect(callback).not.toHaveBeenCalled()

    act(debounce)

    act(() => jest.advanceTimersByTime(600))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(400))

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should handle changing dependencies correctly', () => {
    const callback = jest.fn()
    let delay = 1000
    const { result, rerender } = renderHook(({ delay }) => useDebounce(callback, delay, [delay]), {
      initialProps: { delay }
    })

    const debounce = result.current

    act(debounce)

    act(() => jest.advanceTimersByTime(500))

    expect(callback).not.toHaveBeenCalled()

    delay = 2000
    rerender({ delay })
    const newDebounce = result.current

    act(newDebounce)

    act(() => jest.advanceTimersByTime(1999))

    expect(callback).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should call callback with callback params', () => {
    const callbackParams = { testParam: 'test' }
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 1000))

    const debounce = result.current

    act(() => debounce(callbackParams))

    act(() => jest.advanceTimersByTime(1000))

    expect(callback).toHaveBeenCalledWith(callbackParams)
  })
})
