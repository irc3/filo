import React, { useEffect } from 'react';
import Image from 'components/image'
import useTranslation from 'hooks/useTranslation';
import { useRouter } from 'next/router'
import useAuth from 'hooks/useAuth';
// import { event } from '@tauri-apps/api'
// import { useTauriUpdater } from './hooks';

// const { listen } = event

export default function Index() {
  // const updater = useTauriUpdater()
  const { t } = useTranslation()

  useEffect(() => {
    // listen status change
    // console.log('listen update status')
    // listen('tauri://update-status', (data: { payload: any }) => {
    //   alert('update status: ' + JSON.stringify(data.payload))
    //   console.log('update status change', data)
    // })
  }, [])

  const router = useRouter()
  const auth = useAuth()
  console.log('auth is: ', auth)

  return (
    <div className="App">
      <header className="App-header">
        <Image src='/logo.svg' className="App-logo" alt="logo" width={100} height={100} />
        <p>
          Edit <code>src/pages/index.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('hello', 'Hello World')}
        </a>
        <button onClick={() => router.push('/login')} >
          {t('login', 'Login')}
        </button>
      </header>
    </div>
  );
}
