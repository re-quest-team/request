import { LockClosedIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'
import { IntlShape } from 'react-intl'

type QuestData = {
  question: string
  codeword: string
}

const CryptoQuest = (intl: IntlShape): IQuest<QuestData> => {
  return {
    type: 'QUEST_CRYPTO',
    title: intl.formatMessage({ id: 'quests.crypto.title' }),
    description: intl.formatMessage({ id: 'quests.crypto.description' }),
    icon: LockClosedIcon,
    EditView,
    PlayView: PlayView,
    onLoad: ({ question, codeword }) =>
      useQuestStore.setState(state => ({ ...state, question, codeword })),

    onSave: () => {
      const question = useQuestStore.getState().question
      const codeword = useQuestStore.getState().codeword
      return {
        question,
        codeword,
      }
    },

    onSolve: callback => {
      useQuestStore.subscribe(state => {
        if (state.correct) {
          callback()
        }
      })
    },
  }
}

export default CryptoQuest
