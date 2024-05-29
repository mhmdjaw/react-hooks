import { renderHook, act } from '@testing-library/react'
import { useDisclosure } from '../hooks/use-disclosure'

describe('useDisclosure', () => {
  it('should set opened to true after initially being false', () => {
    const { result } = renderHook(() => useDisclosure())

    const [opened1, disclosure1] = result.current

    expect(opened1).toBe(false)

    act(disclosure1.open)

    const [opened2] = result.current

    expect(opened2).toBe(true)
  })

  it('should set opened to false after initially being true', () => {
    const { result } = renderHook(() => useDisclosure(true))

    const [opened1, disclosure1] = result.current

    expect(opened1).toBe(true)

    act(disclosure1.close)

    const [opened2] = result.current

    expect(opened2).toBe(false)
  })

  it('should toggle opened value', () => {
    const { result } = renderHook(() => useDisclosure())

    const [opened1, disclosure1] = result.current

    expect(opened1).toBe(false)

    act(disclosure1.toggle)

    const [opened2, disclosure2] = result.current

    expect(opened2).toBe(true)

    act(disclosure2.toggle)

    const [opened3] = result.current

    expect(opened3).toBe(false)
  })

  it('should keep opened true if it is already true or false if already false when open or false are called', () => {
    const { result } = renderHook(() => useDisclosure())

    const [opened1, disclosure1] = result.current

    expect(opened1).toBe(false)

    act(disclosure1.close)

    const [opened2, disclosure2] = result.current

    expect(opened2).toBe(false)

    act(disclosure2.open)

    const [opened3, disclosure3] = result.current

    expect(opened3).toBe(true)

    act(disclosure3.open)

    const [opened4] = result.current

    expect(opened4).toBe(true)
  })
})
