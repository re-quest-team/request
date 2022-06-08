import { chat-alt } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'
import EditView from './EditView'
import PlayView from './PlayView'
import { useQuestStore } from './store'
import { useQuestStore } from './store'
import { chat-alt } from '@heroicons/react/outline'
import { IQuest } from '@/collections/types'

type QuestData = {
    question: string
    answer: string
}

const TextInputQuest = (intl:IntlShape): IQuest<QuestData> => {
    return {
        type: 'QUEST_TEXT_INPUT',
        title: 'Text Eingabe',
        description: 'Hier eine Frage die mit Text beantwortet werden muss.'
        icon: chat-alt,
        EditView,
        PlayView: PlayView,

        onLoad: ({ question, answer }) =>
                    useQuestStore.setState(state => ({ ...state, question, answer })),

        onSave: () => {
            const question = useQuestStore.getState().question
            const answer = useQuestStore.getState().answer
            return {
              question,
              answer,
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

export default TextInputQuest
