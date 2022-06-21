import create from 'zustand'
import { compareStringArray } from 'utils/compareStringArray'

interface QuestState {
  question: string
  correctAnswers: string[]
  wrongAnswers: string[]
  shuffledAnswers: string[]
  setQuestion: (question: string) => void
  setCorrectAnswers: (correctAnswer: string[]) => void
  setWrongAnswers: (wrongAnswers: string[]) => void
  setShuffledAnswers: (shuffledAnswers: string[]) => void
  correct: boolean
  onSolve: (input: string[]) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  correctAnswers: ['', '', ''],
  wrongAnswers: ['', '', ''],
  shuffledAnswers: [],
  setQuestion: question => set(() => ({ question })),
  setCorrectAnswers: correctAnswers => set(() => ({ correctAnswers })),
  setWrongAnswers: wrongAnswers => set(() => ({ wrongAnswers })),
  setShuffledAnswers: shuffledAnswers => set(() => ({ shuffledAnswers })),
  correct: false,
  onSolve: input => {
    const correct = compareStringArray(input, get().correctAnswers)
    set(() => ({ correct }))
    return correct
  },
}))
