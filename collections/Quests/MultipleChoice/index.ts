import { ViewListIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'

type QuestData = {
  question: string
  correctAnswer: string
  wrongAnswers: { key: number; name: string }[]
  shuffledAnswers: { key: number; name: string }[]
}

const MultipleChoiceQuest: IQuest<QuestData> = {
  type: 'QUEST_MULTIPLE_CHOICE',
  title: 'MultipleChoice',
  description:
    'Hier kann eine Multiple-Choice-Frage mit bis zu 8 Antwortmöglichkeiten erstellt werden.',
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

export default MultipleChoiceQuest
