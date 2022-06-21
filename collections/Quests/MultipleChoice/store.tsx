import create from 'zustand'
import { compareStringArray } from './Comparor'

interface QuestState {
  question: string
  rightAnswers: string[]
  correctAnswers: { key: number; name: string }[]
  wrongAnswers: { key: number; name: string }[]
  shuffledAnswers: { key: number; name: string }[]
  setQuestion: (question: string) => void
  setRightAnswers: (rightAnswers: string[]) => void
  setCorrectAnswers: (correctAnswer: { key: number; name: string }[]) => void
  setWrongAnswers: (wrongAnswers: { key: number; name: string }[]) => void
  setShuffledAnswers: (shuffledAnswers: { key: number; name: string }[]) => void
  correct: boolean
  onSolve: (input: string[]) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  rightAnswers: [''],
  correctAnswers: [
    { key: -1, name: '' },
    { key: -2, name: '' },
    { key: -3, name: '' },
  ],
  wrongAnswers: [
    { key: 1, name: '' },
    { key: 2, name: '' },
    { key: 3, name: '' },
  ],
  shuffledAnswers: [{ key: 1, name: '' }],
  setRightAnswers: rightAnswers => set(() => ({ rightAnswers })),
  setQuestion: question => set(() => ({ question })),
  setCorrectAnswers: correctAnswers => set(() => ({ correctAnswers })),
  setWrongAnswers: wrongAnswers => set(() => ({ wrongAnswers })),
  setShuffledAnswers: shuffledAnswers => set(() => ({ shuffledAnswers })),
  correct: false,
  onSolve: input => {
    const correct = compareStringArray(input, get().rightAnswers)
    set(() => ({ correct }))
    return correct
  },
}))
