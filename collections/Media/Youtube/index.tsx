import { MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import {
  useYoutubeStoreEmbedLink,
  useYoutubeStoreStartTimestamp,
  useYoutubeStoreEndTimestamp,
  Timestamp,
} from './store'

type Data = {
  link: string
  start: Timestamp
  stop: Timestamp
}

const YoutubeMedia: IQuest<Data> = {
  type: 'MEDIA_YOUTUBE',
  title: 'Youtube Embed',
  description: 'Hier kann ein Youtube Video eingebunden werden',
  icon: MenuAlt1Icon,
  EditView,
  PlayView,
  onLoad: ({ link, start, stop }) => {
    useYoutubeStoreEmbedLink.setState(state => ({ ...state, link }))
    useYoutubeStoreStartTimestamp.setState(state => ({ ...state, start }))
    useYoutubeStoreEndTimestamp.setState(state => ({ ...state, stop }))
  },
  onSave: () => ({
    link: useYoutubeStoreEmbedLink.getState().store,
    start: useYoutubeStoreStartTimestamp.getState().store,
    stop: useYoutubeStoreEndTimestamp.getState().store,
  }),
}

export default YoutubeMedia
