import { tokenAtom } from 'atoms'
import { LOCAL_STORAGE_TOKEN } from 'consts'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { storage } from 'utils'

const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom)

  useEffect(() => {
    if (!token) {
      storage.del(LOCAL_STORAGE_TOKEN)
    } else {
      storage.set(LOCAL_STORAGE_TOKEN, token)
    }
  }, [token])

  return {
    token,
    setToken
  }
}

export default useAuth
