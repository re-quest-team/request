import TextMedia from './Media/Text'
import YoutubeMedia from './Media/Youtube'
import CryptoQuest from './Quests/Crypto'
import MultipleChoiceQuest from './Quests/MultipleChoice'
import InstagramMedia from '@/collections/Media/Instagram'
import NumberInputQuest from './Quests/NumberInput'
import { IntlShape } from 'react-intl'
import { IQuest } from '@/collections/types'
import BlocklyQuest from '@/collections/Quests/Blockly'

const media = (intl: IntlShape): IQuest<any>[] => [
  TextMedia(intl),
  InstagramMedia,
  YoutubeMedia(intl),
]
const quests = (intl: IntlShape): IQuest<any>[] => [
  CryptoQuest(intl),
  NumberInputQuest,
  MultipleChoiceQuest(intl),
  BlocklyQuest(intl),
  ...media(intl),
]

export default quests
