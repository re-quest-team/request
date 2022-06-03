import { useForm } from 'react-hook-form'
import { formOptions } from '@/collections/Quests/NumberInput/validation'
import create from 'zustand'

interface QuestState {
  question: string
  answer: number
  setQuestion: (question: string) => void
  setAnswer: (answer: number) => void
  correct: boolean
  onSolve: (input: number) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  answer: NaN,
  setQuestion: question => set(() => ({ question })),
  setAnswer: answer => set(() => ({ answer })),
  correct: false,
  onSolve: input => {
    const correct = input === get().answer
    set(() => ({ correct }))
    return correct
  },
}))
