import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useTextStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline'

type Data = {
  text: string
}

const TextMedia: IQuest<Data> = {
  type: 'MEDIA_TEXT',
  title: 'title',
  description: 'description',
  icon: Bars3CenterLeftIcon,
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
