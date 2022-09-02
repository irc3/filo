import type { WebviewWindow } from "@tauri-apps/api/window"
import { useEffect, useState } from "react"

const useTauriWindow = () => {
  const [tauriWindow, setTauriWindow] = useState<WebviewWindow | null>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    import('@tauri-apps/api/window').then(res => {
      setTauriWindow(res.appWindow)
      setReady(true)
    }).catch(console.error)
  }, [])

  return { tauriWindow, ready }
}

export default useTauriWindow
