import { CalculatorIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'
import { IntlShape } from 'react-intl'

export type NumberInputQuestData = {
  question: string
  answer: number
  unit: string
}

const NumberInputQuest = (intl: IntlShape): IQuest<NumberInputQuestData> => {
  return {
    type: 'QUEST_NUMBER_INPUT',
    title: intl.formatMessage({ id: 'quests.numberInput.title' }),
    description: intl.formatMessage({ id: 'quests.numberInput.description' }),
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
  }
}

export default NumberInputQuest
