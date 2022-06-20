/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router

  return (
    <Fragment>
      {locales &&
        locales
          .filter(locale => locale !== activeLocale)
          .map(locale => {
            const { pathname, query, asPath } = router
            return (
              <Link
                key={locale}
                href={{ pathname, query }}
                as={asPath}
                locale={locale}
              >
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
