import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'

import '@fontsource/inter'
import '@fontsource/inter/600.css'
import '@fontsource/inter/900.css'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import flatten from 'flat'

import de from '../lang/de.json'
import en from '../lang/en.json'
import ToastIntlProidver from '@/components/Toasts/ToastIntlProvider'

const messages = {
  en,
  de,
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<SessionProviderProps>) {
  const router = useRouter()
  const { locale } = useRouter()
  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={flatten(messages[locale])}>
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher: url => axios.get(url).then(res => res.data),
          }}
        >
          <Toaster
            toastOptions={{
              className: '',
              style: {
                color: '#fff',
                backgroundColor: '#374151',
              },
            }}
          />
          <>
            <ToastIntlProidver />
            {router.pathname.includes('play') ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </>
        </SWRConfig>
      </SessionProvider>
    </IntlProvider>
  )
}
