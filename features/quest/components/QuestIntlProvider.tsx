import { IQuest } from '@/collections/types'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'

import flatten from 'flat'
import { useIntlStore } from '@/stores/intl'

type Props = {
  quest: IQuest<any>
  children?: JSX.Element | JSX.Element[]
}

const QuestIntlProvider: React.FC<Props> = ({ quest, children }) => {
  const locale = useIntlStore(store => store.locale)

  if (!quest.lang) return <>{children}</>

  return (
    <IntlProvider
      locale={locale}
      messages={flatten(quest.lang[locale])}
      onError={err => {
        if (err.code === 'MISSING_TRANSLATION') {
          console.warn('Missing translation', err.message)
          return
        }
        throw err
      }}
    >
      {children}
    </IntlProvider>
  )
}

export default QuestIntlProvider
