import create from 'zustand'

export type mapItem = {
  key: number
  value: string
}

interface QuestState {
  text: string
  textList: string[]
  correctAnswers: string[]
  wrongAnswers: string[]
  shuffledAnswers: mapItem[]
  setText: (text: string) => void
  setTextList: (textList: string[]) => void
  setCorrectAnswers: (correctAnswers: string[]) => void
  setWrongAnswers: (wrongAnswers: string[]) => void
  setShuffledAnswers: (wrongAnswers: mapItem[]) => void
  correct: boolean
  onSolve: (input: string[]) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  text: '',
  textList: [],
  correctAnswers: [],
  wrongAnswers: [],
  shuffledAnswers: [],
  setText: text => set(() => ({ text })),
  setTextList: textList => set(() => ({ textList })),
  setCorrectAnswers: correctAnswers => set(() => ({ correctAnswers })),
  setWrongAnswers: wrongAnswers => set(() => ({ wrongAnswers })),
  setShuffledAnswers: shuffledAnswers => set(() => ({ shuffledAnswers })),
  correct: false,
  onSolve: input => {
    const solution = get().correctAnswers
    const correct = input
      .map((answer, index) => answer === solution[index])
      .reduce((a, b) => a && b)
    set(() => ({ correct }))
    return correct
  },
}))
