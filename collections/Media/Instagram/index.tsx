import { MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useInstagramStore } from './store'
import { Instagram } from 'react-feather'
import { CameraIcon } from '@heroicons/react/solid'

type Data = {
  link: string
}

const InstagramMedia: IQuest<Data> = {
  type: 'MEDIA_INSTAGRAM',
  title: 'Instagram',
  description: 'Hier kann ein einfacher Instagram Post angezeigt werden',
  icon: Instagram,
  EditView,
  PlayView,
  onLoad: ({ link }) =>
    useInstagramStore.setState(state => ({ ...state, link })),
  onSave: () => ({
    link: useInstagramStore.getState().link,
  }),
}

export default InstagramMedia
