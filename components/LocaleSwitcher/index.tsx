'use client'

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const locales = ['de', 'en']
  const activeLocale = 'de'

  return (
    <Fragment>
      {locales &&
        locales
          .filter(locale => locale !== activeLocale)
          .map(locale => {
            return (
              <Link key={locale} href={{ pathname }} locale={locale}>
                <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-slate-200 ring-offset-2 ring-offset-slate-800">
                  <img
                    src={require('assets/flags/' + locale + '.svg').default.src}
                    alt={locale}
                    className="h-full object-cover"
                  />
                </div>
              </Link>
            )
          })}
    </Fragment>
  )
}
