import { PuzzleIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { mapItem, useQuestStore } from './store'
import { IntlShape } from 'react-intl'

type QuestData = {
  text: string
  textList: string[]
  correctAnswers: string[]
  wrongAnswers: string[]
  shuffledAnswers: mapItem[]
}

const GapTextQuest = (intl: IntlShape): IQuest<QuestData> => {
  return {
    type: 'QUEST_GAP_TEXT',
    title: intl.formatMessage({ id: 'quests.gapText.title' }),
    description: intl.formatMessage({ id: 'quests.gapText.description' }),
    icon: PuzzleIcon,
    EditView,
    PlayView: PlayView,
    onLoad: ({
      text,
      textList,
      correctAnswers,
      wrongAnswers,
      shuffledAnswers,
    }) =>
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
  }
}

export default GapTextQuest