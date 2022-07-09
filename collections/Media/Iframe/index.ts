import { CodeIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from '@/collections/Media/Iframe/EditView'
import PlayView from '@/collections/Media/Iframe/PlayView'
import { useIframeStore } from '@/collections/Media/Iframe/store'

import de from './lang/de.json'
import en from './lang/en.json'

type Data = {
  title: string
  link: string
}

const IframeMedia: IQuest<Data> = {
  type: 'MEDIA_IFRAME',
  title: 'title',
  description: 'description',
  icon: CodeIcon,
  EditView,
  PlayView,
  onLoad: ({ link, title }) =>
    useIframeStore.setState(state => ({ ...state, link, title })),
  onSave: () => ({
    title: useIframeStore.getState().title,
    link: useIframeStore.getState().link,
  }),
  lang: {
    de,
    en,
  },
}

export default IframeMedia
