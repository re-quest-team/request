import create from 'zustand'

interface QuestState {
  question: string
  correctAnswer: string
  wrongAnswers: { key: number; name: string }[]
  shuffledAnswers: { key: number; name: string }[]
  setQuestion: (question: string) => void
  setCorrectAnswer: (correctAnswer: string) => void
  setWrongAnswers: (wrongAnswers: { key: number; name: string }[]) => void
  setShuffledAnswers: (shuffledAnswers: { key: number; name: string }[]) => void
  correct: boolean
  onSolve: (input: string) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  correctAnswer: '',
  wrongAnswers: [
    { key: 1, name: '' },
    { key: 2, name: '' },
    { key: 3, name: '' },
  ],
  shuffledAnswers: [{ key: 1, name: '' }],
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
