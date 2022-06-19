import TextMedia from './Media/Text'
import YoutubeMedia from './Media/Youtube'
import CryptoQuest from './Quests/Crypto'
import MultipleChoiceQuest from './Quests/MultipleChoice'
import InstagramMedia from '@/collections/Media/Instagram'
import NumberInputQuest from './Quests/NumberInput'
import { IntlShape } from 'react-intl'
import { IQuest } from '@/collections/types'
import IframeMedia from '@/collections/Media/Iframe'

const media = (intl: IntlShape): IQuest<any>[] => [
  TextMedia(intl),
  InstagramMedia,
  YoutubeMedia(intl),
  IframeMedia,
]
const quests = (intl: IntlShape): IQuest<any>[] => [
  CryptoQuest(intl),
  NumberInputQuest,
  MultipleChoiceQuest(intl),
  ...media(intl),
]

export default quests
