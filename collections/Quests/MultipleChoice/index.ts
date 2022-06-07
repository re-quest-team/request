import { LockClosedIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'

type QuestData = {
  question: string
  correctAnswer: string
  wrongAnswers: string[]
}

const MultipleChoiceQuest: IQuest<QuestData> = {
  type: 'QUEST_MULTIPLE_CHOICE',
  title: 'MultipleChoice',
  description:
    'Hier kann eine Frage mit bis zu 8 Antwortmöglichkeiten erstellt werden.',
  icon: LockClosedIcon,
  EditView,
  PlayView: PlayView,
  onLoad: ({ question, correctAnswer, wrongAnswers }) =>
    useQuestStore.setState(state => ({
      ...state,
      question,
      correctAnswer,
      wrongAnswers,
    })),

  onSave: () => {
    const question = useQuestStore.getState().question
    const correctAnswer = useQuestStore.getState().correctAnswer
    const wrongAnswers = useQuestStore.getState().wrongAnswers
    return {
      question,
      correctAnswer,
      wrongAnswers,
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
