import { MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useTextStore } from './store'

type Data = {
  text: string
}

const TextMedia: IQuest<Data> = {
  type: 'MEDIA_TEXT',
  title: 'Text',
  description: 'Hier kann ein einfacher Text angezeigt werden',
  icon: MenuAlt1Icon,
  EditView,
  PlayView,
  onLoad: ({ text }) => useTextStore.setState(state => ({ ...state, text })),
  onSave: () => ({
    text: useTextStore.getState().text,
  }),
}

export default TextMedia
