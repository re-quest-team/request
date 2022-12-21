import create from 'zustand'
import { IntlShape } from 'react-intl'

export type IntlStore = {
  intl: IntlShape | undefined
  setIntl: (intl: IntlShape) => any

  locale: 'de' | 'en'
  setLocale: (locale: 'de' | 'en') => void
}

export const useIntlStore = create<IntlStore>(set => ({
  intl: undefined,
  setIntl: intl => set({ intl }),

  locale: 'de',
  setLocale: locale => set({ locale }),
}))
