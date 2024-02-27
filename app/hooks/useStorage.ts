import { useState, useEffect } from 'react'

// no window object is present for server-side rendering
const IS_SERVER = typeof window === 'undefined'

export const useLocalStorage = <T>(key: string, initialValue: T) => {

  const [value, setValue] = useState(() => {
    if (IS_SERVER) return initialValue;
    const currValue = window.localStorage.getItem(key);
    console.log(currValue)
    if (currValue !== null) return JSON.parse(currValue);
    return JSON.stringify(typeof initialValue === 'function' ? initialValue() : initialValue);
  })

  useEffect(() => {
    if (value === null || value === undefined) return window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}