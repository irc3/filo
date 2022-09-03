const getLocalStorage = () => {
  return typeof localStorage === 'undefined' ? null : localStorage
}

export const get = (key: string) => {
  const storage = getLocalStorage()
  if (!storage) {
    return null
  }
  const strData = storage.getItem(key)
  if (!strData) {
    return null
  }

  try {
    return JSON.parse(strData)
  } catch (error) {
    return null
  }
}

export const set = (key: string, value: any) => {
  const storage = getLocalStorage()
  if (!storage) {
    return false
  }
  storage.setItem(key, JSON.stringify(value))
  return true
}

export const del = (key: string): boolean => {
  const storage = getLocalStorage()
  if (!storage) {
    return false
  }
  storage.removeItem(key)
  return true
}
