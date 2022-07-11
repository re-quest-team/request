import { de, enGB } from 'date-fns/locale'

export default function formatLocale(locale?: string) {
  if (locale === 'de') {
    return de
  }

  if (locale === 'en') {
    return enGB
  }

  return de
}
