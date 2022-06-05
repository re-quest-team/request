import TextMedia from './Media/Text'
import CryptoQuest from './Quests/Crypto'
import NumberInputQuest from './Quests/NumberInput'

const media = [TextMedia]
const quests = [CryptoQuest, NumberInputQuest, ...media]

export default quests
