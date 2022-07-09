import TextMedia from './Media/Text'
import YoutubeMedia from './Media/Youtube'
import CryptoQuest from './Quests/Crypto'
import MultipleChoiceQuest from './Quests/MultipleChoice'
import SingleChoiceQuest from './Quests/SingleChoice'
import InstagramMedia from '@/collections/Media/Instagram'
import NumberInputQuest from './Quests/NumberInput'
import { IQuest } from '@/collections/types'
import ImageMedia from '@/collections/Media/Image'
import GapTextQuest from '@/collections/Quests/GapText'
import IframeMedia from '@/collections/Media/Iframe'

const media: IQuest<any>[] = [
  TextMedia,
  InstagramMedia,
  YoutubeMedia,
  ImageMedia,
  IframeMedia,
]
const quests: IQuest<any>[] = [
  CryptoQuest,
  NumberInputQuest,
  MultipleChoiceQuest,
  SingleChoiceQuest,
  GapTextQuest,
  ...media,
]

export default quests
