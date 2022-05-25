import create from 'zustand'

interface QuestState {
  question: string
  codeword: string
  setQuestion: (question: string) => void
  setCordeword: (codeword: string) => void
  correct: boolean
  onSolve: (input: string) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  question: '',
  codeword: '',
  setQuestion: question => set(() => ({ question })),
  setCordeword: codeword => set(() => ({ codeword })),
  correct: false,
  onSolve: input => {
    const correct = input === get().codeword
    set(() => ({ correct }))
    return correct
  },
}))
