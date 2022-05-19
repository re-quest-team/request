import { LockClosedIcon } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestionStore } from './store'

type Data = {
  question: string
}

const CryptoQuest: IQuest<Data> = {
  type: 'QUEST_CRYPTO',
  title: 'Kryptographie',
  description: 'Hier muss ein Codewort entschlüsselt werden',
  icon: LockClosedIcon,
  EditView,
  PlayView,
  onLoad: ({ question }) =>
    useQuestionStore.setState(state => ({ ...state, question })),
  onSave: () => {
    const question = useQuestionStore.getState().question
    return {
      question,
    }
  },
}

export default CryptoQuest
