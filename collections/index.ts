import TextMedia from './Media/Text'
import CryptoQuest from './Quests/Crypto'
import { IntlShape } from 'react-intl'
import { IQuest } from '@/collections/types'

const media = (intl: IntlShape): IQuest<any>[] => [TextMedia(intl)]
const quests = (intl: IntlShape): IQuest<any>[] => [
  CryptoQuest(intl),
  ...media(intl),
]
export default quests
