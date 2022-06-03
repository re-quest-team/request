import TextMedia from './Media/Text'
import CryptoQuest from './Quests/Crypto'
import NumberInput from './Quests/NumberInput'

const media = [TextMedia]
const quests = [CryptoQuest, NumberInput, ...media]

export default quests
