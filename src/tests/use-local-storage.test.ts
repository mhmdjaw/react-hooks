import { renderHook } from '@testing-library/react'
import { useLocalStorage } from '../hooks/use-local-storage'
import { act } from 'react'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should set, get and remove values correctly from local storage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key'))

    const [getValue, setValue, deleteValue] = result.current

    const setItemMock = jest.spyOn(Storage.prototype, 'setItem')
    const getItemMock = jest.spyOn(Storage.prototype, 'getItem')
    const removeItemMock = jest.spyOn(Storage.prototype, 'removeItem')

    const getValueMock = jest.fn(getValue)

    act(getValueMock)

    expect(getItemMock).toHaveBeenCalledWith('test-key')
    expect(getItemMock).toHaveReturnedWith(null)

    act(() => setValue('test-value'))

    expect(setItemMock).toHaveBeenCalledWith('test-key', JSON.stringify('test-value'))

    act(getValueMock)

    expect(getItemMock).toHaveBeenCalledWith('test-key')
    expect(getItemMock).toHaveReturnedWith(JSON.stringify('test-value'))
    expect(getValueMock).toHaveReturnedWith('test-value')

    act(deleteValue)

    expect(removeItemMock).toHaveBeenCalledWith('test-key')

    act(getValueMock)

    expect(getItemMock).toHaveBeenCalledWith('test-key')
    expect(getItemMock).toHaveReturnedWith(null)
    expect(getValueMock).toHaveReturnedWith(null)
  })

  it('should set the initial value of the item if it does not exist yet', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'test-value'))

    const [getValue] = result.current

    const setItemMock = jest.spyOn(Storage.prototype, 'setItem')
    const getItemMock = jest.spyOn(Storage.prototype, 'getItem')

    expect(setItemMock).toHaveBeenCalledWith('test-key', JSON.stringify('test-value'))

    const getValueMock = jest.fn(getValue)

    act(getValueMock)

    expect(getItemMock).toHaveBeenCalledWith('test-key')
    expect(getItemMock).toHaveReturnedWith(JSON.stringify('test-value'))
    expect(getValueMock).toHaveReturnedWith('test-value')
  })

  it('should not stringify or parse stored values when raw option is set to true', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'test-value', true))

    const [getValue, setValue] = result.current

    const setItemMock = jest.spyOn(Storage.prototype, 'setItem')
    const getItemMock = jest.spyOn(Storage.prototype, 'getItem')

    expect(setItemMock).toHaveBeenCalledWith('test-key', 'test-value')

    const getValueMock = jest.fn(getValue)

    act(getValueMock)

    expect(getItemMock).toHaveBeenCalledWith('test-key')
    expect(getItemMock).toHaveReturnedWith('test-value')
    expect(getValueMock).toHaveReturnedWith('test-value')

    act(() => setValue('test-new-value'))

    expect(setItemMock).toHaveBeenCalledWith('test-key', 'test-new-value')

    act(getValueMock)

    expect(getItemMock).toHaveBeenCalledWith('test-key')
    expect(getItemMock).toHaveReturnedWith('test-new-value')
    expect(getValueMock).toHaveReturnedWith('test-new-value')
  })
})
