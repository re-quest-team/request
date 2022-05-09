import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'

import '@fontsource/inter'
import '@fontsource/inter/600.css'
import '@fontsource/inter/900.css'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import axios from '@/lib/axios'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: url => axios.get(url).then(res => res.data),
        }}
      >
        <Layout>
          <>
            <Toaster
              toastOptions={{
                className: '',
                style: {
                  color: '#fff',
                  backgroundColor: '#374151',
                },
              }}
            />
            <Component {...pageProps} />
          </>
        </Layout>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
