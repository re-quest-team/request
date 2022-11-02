import { PhotoIcon } from '@heroicons/react/24/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useImageStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'

type Data = {
  link: string
}

const ImageMedia: IQuest<Data> = {
  type: 'MEDIA_IMAGE',
  title: 'title',
  description: 'description',
  icon: PhotoIcon,
  EditView,
  PlayView,
  onLoad: ({ link }) => useImageStore.setState(state => ({ ...state, link })),
  onSave: () => ({
    link: useImageStore.getState().link,
  }),
  lang: {
    de,
    en,
  },
}

export default ImageMedia
