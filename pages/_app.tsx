import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

import '@fontsource/inter'
import '@fontsource/inter/900.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full bg-black text-white">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp
