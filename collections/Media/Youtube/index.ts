import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useYoutubeStore } from './store'
import { Youtube } from 'react-feather'
import { Timestamp } from './store'

import de from './lang/de.json'
import en from './lang/en.json'

type Data = {
  link: string
  start: Timestamp
  end: Timestamp
}

const YoutubeMedia: IQuest<Data> = {
  type: 'MEDIA_YOUTUBE',
  title: 'title',
  description: 'description',
  icon: Youtube,
  modalSize: 'large',
  EditView,
  PlayView,
  onLoad: ({ link, start, end }) => {
    useYoutubeStore.setState(state => ({ ...state, link, start, end }))
  },
  onSave: () => ({
    link: useYoutubeStore.getState().link,
    start: useYoutubeStore.getState().start,
    end: useYoutubeStore.getState().end,
  }),
  lang: {
    de,
    en,
  },
}

export default YoutubeMedia
