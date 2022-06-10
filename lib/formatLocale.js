import { de, enGB } from 'date-fns/locale'
import { IntlShape } from 'react-intl'

const locales = { de, enGB }

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export default function formatLocale() {
  return locales[global.__localeId__]
}
