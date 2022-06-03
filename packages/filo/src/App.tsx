import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import { event } from '@tauri-apps/api'
// import { useTauriUpdater } from './hooks';

// const { listen } = event

function App() {
  // const updater = useTauriUpdater()

  useEffect(() => {
    // listen status change
    // console.log('listen update status')
    // listen('tauri://update-status', (data: { payload: any }) => {
    //   alert('update status: ' + JSON.stringify(data.payload))
    //   console.log('update status change', data)
    // })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
