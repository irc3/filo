import { useEffect, useState } from 'react'
import WalletConnect from "@walletconnect/client";
import { cloneDeep } from 'lodash-es'
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useAtom } from 'jotai'
import { connectedAtom, profileAtom } from 'atoms';

const useWalletConnect = () => {
  const [connected, setConnected] = useAtom(connectedAtom)
  const [profile, setProfile] = useAtom(profileAtom)

  // Create a connector
  const [connector] = useState<WalletConnect>(() => {
    const newConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
      qrcodeModalOptions: {
        desktopLinks: [] // disable desktop links
      }
    });

    setConnected(newConnector.connected)
    setProfile(newConnector.connected ? cloneDeep(newConnector.session) : null)

    // Subscribe to connection events
    newConnector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      setConnected(true)

      // Get provided accounts and chainId
      setProfile(cloneDeep(newConnector.session))
      QRCodeModal.close()
    });

    newConnector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      setProfile(cloneDeep(newConnector.session))
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

  // useEffect(() => {
  //   if (connected) {
  //     setProfile(cloneDeep(connector.session))
  //   }
  // }, [connected])

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
