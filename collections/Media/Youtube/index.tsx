import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useYoutubeStore } from './store'
import { Youtube } from 'react-feather'
import { Timestamp } from './store'

type Data = {
  link: string
  start: Timestamp
  end: Timestamp
}

const YoutubeMedia: IQuest<Data> = {
  type: 'MEDIA_YOUTUBE',
  title: 'Youtube',
  description: 'Hier kann ein Youtube Video eingebunden werden',
  icon: Youtube,
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

export default YoutubeMedia
