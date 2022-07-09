import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useInstagramStore } from './store'
import { Instagram } from 'react-feather'

import de from './lang/de.json'
import en from './lang/en.json'

type Data = {
  link: string
}

const InstagramMedia: IQuest<Data> = {
  type: 'MEDIA_INSTAGRAM',
  title: 'title',
  description: 'description',
  icon: Instagram,
  EditView,
  PlayView,
  onLoad: ({ link }) =>
    useInstagramStore.setState(state => ({ ...state, link })),
  onSave: () => ({
    link: useInstagramStore.getState().link,
  }),
  lang: {
    de,
    en,
  },
}

export default InstagramMedia
