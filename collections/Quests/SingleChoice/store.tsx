import create from 'zustand'

interface QuestState {
  question: string
  correctAnswer: string
  wrongAnswers: string[]
  shuffledAnswers: string[]
  setQuestion: (question: string) => void
  setCorrectAnswer: (correctAnswer: string) => void
  setWrongAnswers: (wrongAnswers: string[]) => void
  setShuffledAnswers: (shuffledAnswers: string[]) => void
  correct: boolean
  onSolve: (input: string) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  correctAnswer: '',
  wrongAnswers: ['', '', ''],
  shuffledAnswers: [],
  setQuestion: question => set(() => ({ question })),
  setCorrectAnswer: correctAnswer => set(() => ({ correctAnswer })),
  setWrongAnswers: wrongAnswers => set(() => ({ wrongAnswers })),
  setShuffledAnswers: shuffledAnswers => set(() => ({ shuffledAnswers })),
  correct: false,
  onSolve: input => {
    const correct = input === get().correctAnswer
    set(() => ({ correct }))
    return correct
  },
}))
