import { CodeIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from '@/collections/Media/IFrame/EditView'
import PlayView from '@/collections/Media/IFrame/PlayView'
import { useIframeStore } from '@/collections/Media/IFrame/store'
import { IntlShape } from 'react-intl'

type Data = {
  link: string
}

const IframeMedia = (intl: IntlShape): IQuest<Data> => {
  return {
    type: 'MEDIA_IFRAME',
    title: 'iframe',
    description: intl.formatMessage({ id: 'media.iframe.description' }),
    icon: CodeIcon,
    EditView,
    PlayView,
    onLoad: ({ link }) => useIframeStore.setState(state => ({ ...state, link })),
    onSave: () => ({
      link: useIframeStore.getState().link,
    }),
  }
}

export default IframeMedia
