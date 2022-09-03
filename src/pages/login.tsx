import React, { useEffect } from 'react';
import useTranslation from 'hooks/useTranslation';
import useWalletConnect from 'hooks/useWalletConnect';
import { useRouter } from 'next/router';

export default function Login() {
  const { t } = useTranslation()
  const { connect, connected } = useWalletConnect()
  const router = useRouter()
  const callbackUrl = router.query.callback

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    if (connected) {
      // redirect to original page
      if (typeof callbackUrl === 'string' && callbackUrl) {
        router.push(callbackUrl)
      }
    }
  }, [connected])

  return (
    <div className="App flex justify-center items-center">
      Login page
    </div>
  );
}
