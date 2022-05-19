import create from 'zustand'

interface QuestionState {
  question: string
  setQuestion: (question: string) => void
}

export const useQuestionStore = create<QuestionState>()(set => ({
  question: '',
  setQuestion: question => set(() => ({ question: question })),
}))
