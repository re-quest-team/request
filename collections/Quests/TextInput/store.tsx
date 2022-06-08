import create from 'zustand'

interface QuestState {
    question: string
    answer: string
    setQuestion: (question: string) => void
    setAnswer: (answer: string) => void
    correct: boolean
    onSolve: (input: string) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  answer: '',
  setQuestion: question => set(() => ({ question })),
  setAnswer: answer => set(() => ({ answer })),
  correct: false,
  onSolve: input => {
    const correct = input === get().answer
    set(() => ({ correct }))
    return correct
  },
}))
