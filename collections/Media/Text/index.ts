import { MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useTextStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'

type Data = {
  text: string
}

const TextMedia: IQuest<Data> = {
  type: 'MEDIA_TEXT',
  title: 'title',
  description: 'description',
  icon: MenuAlt1Icon,
  EditView,
  PlayView,
  onLoad: ({ text }) => useTextStore.setState(state => ({ ...state, text })),
  onSave: () => ({
    text: useTextStore.getState().text,
  }),
  lang: {
    de,
    en,
  },
}

export default TextMedia
