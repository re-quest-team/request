import { CalculatorIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'
import { Units } from '@/collections/Quests/NumberInput/units'

export type NumberInputQuestData = {
  question: string
  answer: number
  unit: Units
}

const NumberInputQuest: IQuest<NumberInputQuestData> = {
  type: 'QUEST_NUMBER_INPUT',
  title: 'Nummern Eingabe',
  description: 'Hier ein Frage mit einer Nummer beantwortet werden.',
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

export default NumberInputQuest
