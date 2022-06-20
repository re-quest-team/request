import { LockClosedIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'
import { IntlShape } from 'react-intl'
import { CodeIcon } from '@heroicons/react/solid'

export type QuestData = {
  codingQuest: string
}

const BlocklyQuest = (intl: IntlShape): IQuest<QuestData> => {
  return {
    type: 'QUEST_CODING',
    title: intl.formatMessage({ id: 'quests.blockly.title' }),
    description: intl.formatMessage({ id: 'quests.blockly.description' }),
    icon: CodeIcon,
    EditView,
    PlayView: PlayView,
    onLoad: ({ codingQuest }) =>
      useQuestStore.setState(state => ({ ...state, codingQuest })),

    onSave: () => {
      const codingQuest = useQuestStore.getState().codingQuest
      return {
        codingQuest,
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

export default BlocklyQuest
