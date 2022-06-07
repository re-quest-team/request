import { MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useTextStore } from './store'
import { IntlShape } from 'react-intl'

type Data = {
  text: string
}

const TextMedia = (intl: IntlShape): IQuest<Data> => {
  return {
    type: 'MEDIA_TEXT',
    title: intl.formatMessage({ id: 'media.text.title' }),
    description: intl.formatMessage({ id: 'media.text.description' }),
    icon: MenuAlt1Icon,
    EditView,
    PlayView,
    onLoad: ({ text }) => useTextStore.setState(state => ({ ...state, text })),
    onSave: () => ({
      text: useTextStore.getState().text,
    }),
  }
}

export default TextMedia
