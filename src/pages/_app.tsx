import 'intl-pluralrules'
import { AppProps } from 'next/app'
import '../styles/global.css'
import Layout from 'components/layout'

export default function FiloApp ({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
