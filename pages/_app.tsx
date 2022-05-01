import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'

import '@fontsource/inter'
import '@fontsource/inter/600.css'
import '@fontsource/inter/900.css'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: url => fetch(url).then(r => r.json()),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
