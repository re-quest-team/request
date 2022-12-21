import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'
import { LockOpenIcon } from '@heroicons/react/24/outline'

type QuestData = {
  question: string
  codeword: string
}

const CryptoQuest: IQuest<QuestData> = {
  type: 'QUEST_CRYPTO',
  title: 'title',
  description: 'description',
  icon: LockOpenIcon,
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

  lang: {
    de,
    en,
  },
}

export default CryptoQuest
