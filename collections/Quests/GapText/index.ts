import { PuzzleIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { mapItem, useQuestStore } from './store'
import { IntlShape } from 'react-intl'

type QuestData = {
  textList: mapItem[]
  correctAnswers: mapItem[]
  wrongAnswers: string[]
  shuffledAnswers: mapItem[]
}

const GapTextQuest = (intl: IntlShape): IQuest<QuestData> => {
  return {
    type: 'QUEST_GAP_TEXT',
    title: intl.formatMessage({ id: 'quests.gaptext.title' }),
    description: intl.formatMessage({ id: 'quests.gaptext.description' }),
    icon: PuzzleIcon,
    EditView,
    PlayView: PlayView,
    onLoad: ({ textList, correctAnswers, wrongAnswers, shuffledAnswers }) =>
      useQuestStore.setState(state => ({
        ...state,
        textList,
        correctAnswers,
        wrongAnswers,
        shuffledAnswers,
      })),

    onSave: () => ({
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
  }
}

export default GapTextQuest
