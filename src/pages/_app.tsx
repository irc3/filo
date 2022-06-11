import type { AppProps } from 'next/app'
import '../styles/global.css';

export default function FiloWeb ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
