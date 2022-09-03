import { useEffect, useState } from "react"
import useAuth from "./useAuth"
import { useRouter } from 'next/router'

const useAuthGuard = () => {
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'
  const [forbidden, setForbidden] = useState(!isLoginPage)

  const { connected } = useAuth()

  useEffect(() => {
    if (!connected && !isLoginPage) {
      router.push(`/login?callback=${encodeURIComponent(router.pathname)}`)
    } else {
      setForbidden(false)
    }
  }, [connected, isLoginPage])

  return {
    forbidden
  }
}

export default useAuthGuard
