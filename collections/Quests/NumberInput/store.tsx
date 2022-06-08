import create from 'zustand'
import { Units } from '@/collections/Quests/NumberInput/units'

interface QuestState {
  question: string
  answer: number
  unit: string
  setQuestion: (question: string) => void
  setAnswer: (answer: number) => void
  setUnit: (unit: string) => void
  correct: boolean
  onSolve: (input: number) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  answer: 0,
  unit: Units.None,
  setQuestion: question => set(() => ({ question })),
  setAnswer: answer => set(() => ({ answer })),
  setUnit: unit => set(() => ({ unit })),
  correct: false,
  onSolve: input => {
    const correct = input === get().answer
    set(() => ({ correct }))
    return correct
  },
}))
