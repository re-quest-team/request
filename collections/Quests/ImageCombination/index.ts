import { LockClosedIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'
import { IntlShape } from 'react-intl'

type QuestData = {
  task: string
  imageToBeCombined: string
  imagesToCombineRight: string[]
  imagesToCombineWrong: string[]
}

const ImageCombinationQuest = (intl: IntlShape): IQuest<QuestData> => {
  return {
    type: 'QUEST_IMAGE_COMBINATION',
    title: intl.formatMessage({ id: 'quests.imageCombination.title' }),
    description: intl.formatMessage({
      id: 'quests.imageCombination.description',
    }),
    icon: LockClosedIcon,
    EditView,
    PlayView: PlayView,
    onLoad: ({
      task,
      imageToBeCombined,
      imagesToCombineRight,
      imagesToCombineWrong,
    }) =>
      useQuestStore.setState(state => ({
        ...state,
        task,
        imageToBeCombined,
        imagesToCombineRight,
        imagesToCombineWrong,
      })),

    onSave: () => {
      const task = useQuestStore.getState().task
      const imageToBeCombined = useQuestStore.getState().imageToBeCombined
      const imagesToCombineRight = useQuestStore.getState().imagesToCombineRight
      const imagesToCombineWrong = useQuestStore.getState().imagesToCombineWrong
      return {
        task,
        imageToBeCombined,
        imagesToCombineRight,
        imagesToCombineWrong,
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

export default ImageCombinationQuest
