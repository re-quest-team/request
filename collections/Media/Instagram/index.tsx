import { MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useInstagramStore } from './store'
import { Instagram } from 'react-feather'
import { CameraIcon } from '@heroicons/react/solid'
import { IntlShape } from 'react-intl'

type Data = {
  link: string
}

const InstagramMedia = (intl: IntlShape): IQuest<Data> => {
  return {
    type: 'MEDIA_INSTAGRAM',
    title: 'Instagram',
    description: intl.formatMessage({ id: 'media.instagram.description' }),
    icon: Instagram,
    EditView,
    PlayView,
    onLoad: ({ link }) =>
      useInstagramStore.setState(state => ({ ...state, link })),
    onSave: () => ({
      link: useInstagramStore.getState().link,
    }),
  }
}

export default InstagramMedia
