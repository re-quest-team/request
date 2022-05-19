import TextMedia from './Media/Text'
import CryptoQuest from './Quests/Crypto'

const media = [TextMedia]
const quests = [CryptoQuest, ...media]

export default quests
