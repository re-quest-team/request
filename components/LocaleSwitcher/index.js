import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import clsx from 'clsx'
import { Fragment } from 'react'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales.filter(locale => locale !== activeLocale)

  return (
    <Fragment>
      {otherLocales.map(locale => {
        const { pathname, query, asPath } = router
        return (
          <Link
            key={locale}
            href={{ pathname, query }}
            as={asPath}
            locale={locale}
          >
            <a
              className={clsx(
                'text-slate-300 hover:bg-slate-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium',
              )}
            >
              <Image
                src={require('assets/flags/' + locale + '.svg')}
                alt={locale}
                width={'30px'}
                height={'20px'}
              />
            </a>
          </Link>
        )
      })}
    </Fragment>
  )
}
