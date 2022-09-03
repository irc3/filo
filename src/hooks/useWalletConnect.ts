import { useEffect, useState } from 'react'
import WalletConnect from "@walletconnect/client";
import { WalletSession } from 'types';
import { cloneDeep } from 'lodash-es'
import QRCodeModal from "@walletconnect/qrcode-modal";

const useWalletConnect = () => {
  const [connected, setConnected] = useState(false)
  const [profile, setProfile] = useState<WalletSession | null>(null)

  // Create a connector
  const [connector] = useState<WalletConnect>(() => {
    const newConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
      qrcodeModalOptions: {
        desktopLinks: [] // disable desktop links
      }
    });

    // Subscribe to connection events
    newConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      setConnected(true)

      // Get provided accounts and chainId
      console.log('payload is: ', payload)
      setProfile(cloneDeep(payload.params?.[0] ?? null))
    });

    newConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      setProfile(cloneDeep(payload.params?.[0] ?? null))
    });

    newConnector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      setConnected(false)
      setProfile(null)
    });
    return newConnector
  })

  useEffect(() => {
    if (connector.connected) {
      setConnected(true)
      setProfile(cloneDeep(connector.session))
    }
  }, [])

  // show qrcode
  const connect = () => {
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }
  }

  return {
    connector,
    connect,
    connected,
    profile
  }
}

export default useWalletConnect
