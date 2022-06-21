import { PhotographIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useImageStore } from './store'
import { IntlShape } from 'react-intl'

type Data = {
  link: string
}

const ImageMedia = (intl: IntlShape): IQuest<Data> => {
  return {
    type: 'MEDIA_IMAGE',
    title: intl.formatMessage({ id: 'media.image.title' }),
    description: intl.formatMessage({ id: 'media.image.description' }),
    icon: PhotographIcon,
    EditView,
    PlayView,
    onLoad: ({ link }) => useImageStore.setState(state => ({ ...state, link })),
    onSave: () => ({
      link: useImageStore.getState().link,
    }),
  }
}

export default ImageMedia
