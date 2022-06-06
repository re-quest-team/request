import TextMedia from './Media/Text'
import YoutubeMedia from './Media/Youtube'
import CryptoQuest from './Quests/Crypto'

const media = [TextMedia, YoutubeMedia]
const quests = [CryptoQuest, ...media]

export default quests
