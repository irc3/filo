import { ReactNode } from 'react'
// import Header from './header'
import Footer from './footer'
import useAuthGuard from 'hooks/useAuthGuard';

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout ({ children }: LayoutProps) {
  const { forbidden } = useAuthGuard()

  if (forbidden) {
    return null
  }

  return (
    <div className="app w-screen h-screen flex flex-col bg-zinc-900 text-white rounded-lg">
      {/* <div className='header bg-zinc-800 h-10' data-tauri-drag-region>
        <Header />
      </div> */}
      <div className='main flex-1'>
        {children}
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}
