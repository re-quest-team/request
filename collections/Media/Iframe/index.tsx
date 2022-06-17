import { CodeIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useIframeStore } from './store'

type Data = {
  link: string
}

const IframeMedia: IQuest<Data> = {
  type: 'MEDIA_IFRAME',
  title: 'iframe',
  description: 'Hier kann eine Website als iframe angezeigt werden',
  icon: CodeIcon,
  EditView,
  PlayView,
  onLoad: ({ link }) => useIframeStore.setState(state => ({ ...state, link })),
  onSave: () => ({
    link: useIframeStore.getState().link,
  }),
}

export default IframeMedia
