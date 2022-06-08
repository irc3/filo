import { useState, useEffect } from 'react'
import { checkUpdate, installUpdate, UpdateManifest } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const useTauriUpdater = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [manifest, setManifest] = useState<UpdateManifest | undefined>()

  const init = async () => {
    try {
      const { shouldUpdate, manifest } = await checkUpdate()
      setLoading(false)
      setUpdateAvailable(shouldUpdate)
      setManifest(manifest)
      // if (shouldUpdate) {
      //   // display dialog
      //   await installUpdate()
      //   // install complete, restart app
      //   await relaunch()
      // }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    init().catch(err => {
      console.error(err)
      setError(err)
    })
  }, [])

  return {
    error,
    loading,
    updateAvailable,
    manifest,
    installUpdate,
    relaunch
  }
}

export default useTauriUpdater
