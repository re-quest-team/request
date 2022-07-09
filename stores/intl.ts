import create from 'zustand'
import { IntlShape } from 'react-intl'

export type IntlStore = {
  intl: IntlShape | undefined
  setIntl: (intl: IntlShape) => any
}

export const useIntlStore = create<IntlStore>(set => ({
  intl: undefined,
  setIntl: intl => set(state => ({ ...state, intl })),
}))
