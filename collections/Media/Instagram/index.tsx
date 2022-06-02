 import { MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useInstagramStore } from './store'

type Data = {
  link: string
}

const InstagramMedia: IQuest<Data> = {
  type: 'MEDIA_INSTAGRAM',
  title: 'Text',
  description: 'Hier kann ein einfacher Instagram Post angezeigt werden',
  icon: MenuAlt1Icon,
  EditView,
  PlayView,
  onLoad: ({ link }) => useInstagramStore.setState(state => ({ ...state, link })),
  onSave: () => ({
    link: useInstagramStore.getState().link,
  }),
}

export default InstagramMedia

