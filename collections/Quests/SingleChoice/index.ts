import { ViewListIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'

type QuestData = {
  question: string
  correctAnswer: string
  wrongAnswers: string[]
  shuffledAnswers: string[]
}

const SingleChoiceQuest: IQuest<QuestData> = {
  type: 'QUEST_SINGLE_CHOICE',
  title: 'title',
  description: 'description',
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
  lang: { de, en },
}

export default SingleChoiceQuest
