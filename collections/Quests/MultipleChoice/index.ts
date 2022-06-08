import { ViewListIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'
import { IntlShape } from 'react-intl'

type QuestData = {
  question: string
  correctAnswer: string
  wrongAnswers: { key: number; name: string }[]
  shuffledAnswers: { key: number; name: string }[]
}

const MultipleChoiceQuest = (intl: IntlShape): IQuest<QuestData> => {
  return {
    type: 'QUEST_MULTIPLE_CHOICE',
    title: intl.formatMessage({ id: 'quests.multiplechoice.title' }),
    description: intl.formatMessage({
      id: 'quests.multiplechoice.description',
    }),
    icon: ViewListIcon,
    EditView,
    PlayView: PlayView,
    onLoad: ({ question, correctAnswer, wrongAnswers, shuffledAnswers }) =>
      useQuestStore.setState(state => ({
        ...state,
        question,
        correctAnswer,
        wrongAnswers,
        shuffledAnswers,
      })),

    onSave: () => {
      const question = useQuestStore.getState().question
      const correctAnswer = useQuestStore.getState().correctAnswer
      const wrongAnswers = useQuestStore.getState().wrongAnswers
      const shuffledAnswers = useQuestStore.getState().shuffledAnswers
      return {
        question,
        correctAnswer,
        wrongAnswers,
        shuffledAnswers,
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

export default MultipleChoiceQuest
