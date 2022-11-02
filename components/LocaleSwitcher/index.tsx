'use client'

/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react'
import { useIntlStore } from '@/stores/intl'

export default function LocaleSwitcher() {
  const locales = ['de', 'en']

  const locale = useIntlStore(store => store.locale)
  const setLocale = useIntlStore(store => store.setLocale)

  return (
    <Fragment>
      {locales &&
        locales
          .filter(l => l !== locale)
          .map(locale => {
            return (
              <div
                key={locale}
                onClick={() => setLocale(locale as 'de' | 'en')}
                className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-slate-200 ring-offset-2 ring-offset-slate-800"
              >
                <img
                  src={require('assets/flags/' + locale + '.svg').default.src}
                  alt={locale}
                  className="h-full object-cover"
                />
              </div>
            )
          })}
    </Fragment>
  )
}
