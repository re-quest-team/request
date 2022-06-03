import { CalculatorIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'

type QuestData = {
  question: string
  answer: number
}

const CryptoQuest: IQuest<QuestData> = {
  type: 'QUEST_NUMBER_INPUT',
  title: 'Nummern Eingabe',
  description: 'Hier ein Frage mit einer Nummer beantwortet werden.',
  icon: CalculatorIcon,
  EditView,
  PlayView: PlayView,
  onLoad: ({ question, answer }) =>
    useQuestStore.setState(state => ({ ...state, question, answer })),

  onSave: () => {
    const question = useQuestStore.getState().question
    const answer = useQuestStore.getState().answer
    return {
      question,
      answer,
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

export default CryptoQuest
