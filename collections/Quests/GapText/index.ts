import { PuzzleIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { mapItem, useQuestStore } from './store'

import de from './lang/de.json'
import en from './lang/en.json'

type QuestData = {
  text: string
  textList: string[]
  correctAnswers: string[]
  wrongAnswers: string[]
  shuffledAnswers: mapItem[]
}

const GapTextQuest: IQuest<QuestData> = {
  type: 'QUEST_GAP_TEXT',
  title: 'title',
  description: 'description',
  icon: PuzzleIcon,
  EditView,
  PlayView: PlayView,
  onLoad: ({ text, textList, correctAnswers, wrongAnswers, shuffledAnswers }) =>
    useQuestStore.setState(state => ({
      ...state,
      text,
      textList,
      correctAnswers,
      wrongAnswers,
      shuffledAnswers,
    })),

  onSave: () => ({
    text: useQuestStore.getState().text,
    textList: useQuestStore.getState().textList,
    correctAnswers: useQuestStore.getState().correctAnswers,
    wrongAnswers: useQuestStore.getState().wrongAnswers,
    shuffledAnswers: useQuestStore.getState().shuffledAnswers,
  }),

  onSolve: callback => {
    useQuestStore.subscribe(state => {
      if (state.correct) {
        callback()
      }
    })
  },

  lang: { de, en },
}

export default GapTextQuest
