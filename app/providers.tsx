'use client'

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
import { useIntlStore } from '@/stores/intl'

const messages = {
  en,
  de,
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const locale = useIntlStore(state => state.locale)

  return (
    <IntlProvider locale={locale} messages={flatten(messages[locale])}>
      <SessionProvider>
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
            {children}
          </>
        </SWRConfig>
      </SessionProvider>
    </IntlProvider>
  )
}
