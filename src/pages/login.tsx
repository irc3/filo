import React, { useEffect } from 'react';
import useTranslation from 'hooks/useTranslation';
import useAuth from 'hooks/useAuth';

export default function Index() {
  const { t } = useTranslation()
  const { setToken } = useAuth()

  useEffect(() => {
    const newToken = String(Math.random())
    console.log('newToken: ', newToken)
    setToken(newToken)
  }, [])

  return (
    <div className="App">
      Login page
    </div>
  );
}
