import React, { useEffect } from 'react';
import useTranslation from 'hooks/useTranslation';
import useWalletConnect from 'hooks/useWalletConnect';

export default function Login() {
  const { t } = useTranslation()
  const { connect } = useWalletConnect()

  useEffect(() => {
    connect()
  }, [])

  return (
    <div className="App flex justify-center items-center">
      Login page
    </div>
  );
}
