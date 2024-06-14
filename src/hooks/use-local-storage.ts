import { useCallback, useLayoutEffect, useState } from 'react'

/**
 * Used to manage local storage items.
 * @param {string} key Key of the local storage item.
 * @param initialValue (Optional) Initial value of the item if it doesn't exist yet.
 * @param {boolean} raw (Optional) If set to `true` the stored value will not be JSON serialized. Defaults to `false`.
 * @returns Functions to get, set, and delete value.
 */
export const useLocalStorage = <T>(key: string, initialValue?: T, raw: boolean = false) => {
  const serialize = raw ? (value: string) => value : JSON.stringify
  const deserialize = raw ? (value: string) => value : JSON.parse

  useLayoutEffect(() => {
    if (localStorage.getItem(key) === null && initialValue) {
      localStorage.setItem(key, serialize(initialValue))
    }
  }, [key])

  const getValue = useCallback(() => {
    const localStorageValue = localStorage.getItem(key)
    if (localStorageValue !== null) {
      return deserialize(localStorageValue)
    } else {
      return localStorageValue
    }
  }, [key])

  const setValue = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, serialize(newValue))
    },
    [key]
  )

  const deleteValue = useCallback(() => {
    localStorage.removeItem(key)
  }, [key])

  return [getValue, setValue, deleteValue] as const
}
