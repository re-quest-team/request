import { CalculatorIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'

export type NumberInputQuestData = {
  question: string
  answer: number
  unit: string
}

const NumberInputQuest: IQuest<NumberInputQuestData> = {
  type: 'QUEST_NUMBER_INPUT',
  title: 'title',
  description: 'description',
  icon: CalculatorIcon,
  EditView,
  PlayView: PlayView,
  onLoad: ({ question, answer, unit }) =>
    useQuestStore.setState(state => ({ ...state, question, answer, unit })),
  onSave: () => {
    const question = useQuestStore.getState().question
    const answer = useQuestStore.getState().answer
    const unit = useQuestStore.getState().unit
    return {
      question,
      answer,
      unit,
    }
  },
  onSolve: callback => {
    useQuestStore.subscribe(state => {
      if (state.correct) {
        callback()
      }
    })
  },
  lang: { de, en },
}

export default NumberInputQuest
