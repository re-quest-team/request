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
  imagesToCombine: string[]
  imagesToCombineRandomOrder: string[]
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
      imagesToCombine,
      imagesToCombineRandomOrder,
    }) =>
      useQuestStore.setState(state => ({
        ...state,
        task,
        imageToBeCombined,
        imagesToCombineRight,
        imagesToCombineWrong,
        imagesToCombine,
        imagesToCombineRandomOrder,
      })),

    onSave: () => {
      const task = useQuestStore.getState().task
      const imageToBeCombined = useQuestStore.getState().imageToBeCombined
      const imagesToCombineRight = useQuestStore.getState().imagesToCombineRight
      const imagesToCombineWrong = useQuestStore.getState().imagesToCombineWrong
      const imagesToCombine = imagesToCombineRight.concat(imagesToCombineWrong)
      const alreadyUsed = new Set()
      const imagesToCombineRandomOrder = []

      let i = 0
      while (imagesToCombine.length != imagesToCombineRandomOrder.length) {
        const randomInt = Math.floor(Math.random() * imagesToCombine.length)
        if (!alreadyUsed.has(randomInt)) {
          imagesToCombineRandomOrder[i] = imagesToCombine[randomInt]
          alreadyUsed.add(randomInt)
          i++
        }
      }

      return {
        task,
        imageToBeCombined,
        imagesToCombineRight,
        imagesToCombineWrong,
        imagesToCombine,
        imagesToCombineRandomOrder,
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
