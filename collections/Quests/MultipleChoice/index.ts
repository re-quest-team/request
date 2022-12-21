import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'
import { ListBulletIcon } from '@heroicons/react/24/outline'

type QuestData = {
  question: string
  correctAnswers: string[]
  wrongAnswers: string[]
  shuffledAnswers: string[]
}

const MultipleChoiceQuest: IQuest<QuestData> = {
  type: 'QUEST_MULTIPLE_CHOICE',
  title: 'title',
  description: 'description',
  icon: ListBulletIcon,
  EditView,
  PlayView: PlayView,
  onLoad: ({ question, correctAnswers, wrongAnswers, shuffledAnswers }) =>
    useQuestStore.setState(state => ({
      ...state,
      question,
      correctAnswers,
      wrongAnswers,
      shuffledAnswers,
    })),

  onSave: () => {
    const question = useQuestStore.getState().question
    const correctAnswers = useQuestStore.getState().correctAnswers
    const wrongAnswers = useQuestStore.getState().wrongAnswers
    const shuffledAnswers = useQuestStore.getState().shuffledAnswers
    return {
      question,
      correctAnswers,
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

  lang: {
    de,
    en,
  },
}

export default MultipleChoiceQuest
