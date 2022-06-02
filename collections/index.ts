import TextMedia from './Media/Text'
import CryptoQuest from './Quests/Crypto'
import InstagramMedia from '@/collections/Media/Instagram'

const media = [TextMedia, InstagramMedia]
const quests = [CryptoQuest, ...media]

export default quests
