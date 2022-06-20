import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useYoutubeStore } from './store'
import { Youtube } from 'react-feather'
import { Timestamp } from './store'
import { IntlShape } from 'react-intl'

type Data = {
  link: string
  start: Timestamp
  end: Timestamp
}

const YoutubeMedia = (intl: IntlShape): IQuest<Data> => {
  return {
    type: 'MEDIA_YOUTUBE',
    title: 'Youtube',
    description: intl.formatMessage({ id: 'media.youtube.description' }),
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
  }
}

export default YoutubeMedia
