import create from 'zustand'

export type mapItem = {
  key: number
  value: string
}

interface QuestState {
  textList: mapItem[]
  correctAnswers: mapItem[]
  wrongAnswers: string[]
  shuffledAnswers: mapItem[]
  setTextList: (textList: mapItem[]) => void
  setCorrectAnswers: (correctAnswers: mapItem[]) => void
  setWrongAnswers: (wrongAnswers: string[]) => void
  setShuffledAnswers: (wrongAnswers: mapItem[]) => void
  correct: boolean
  onSolve: (input: string[]) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  textList: [{ key: 0, value: '' }],
  correctAnswers: [{ key: 0, value: '' }],
  wrongAnswers: [],
  shuffledAnswers: [],
  setTextList: textList => set(() => ({ textList })),
  setCorrectAnswers: correctAnswers => set(() => ({ correctAnswers })),
  setWrongAnswers: wrongAnswers => set(() => ({ wrongAnswers })),
  setShuffledAnswers: shuffledAnswers => set(() => ({ shuffledAnswers })),
  correct: false,
  onSolve: input => {
    const solution = get().correctAnswers
    const correct = input
      .map((answer, index) => answer === solution[index].value)
      .reduce((a, b) => a && b)
    set(() => ({ correct }))
    return correct
  },
}))
