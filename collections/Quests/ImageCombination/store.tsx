import create from 'zustand'

interface QuestState {
  task: string
  setTask: (task: string) => void

  imageToBeCombined: string
  setImageToBeCombined: (imageToBeCombined: string) => void

  imagesToCombineRight: string[]
  setImagesToCombineRight: (imagesToCombineRight: string[]) => void

  imagesToCombineWrong: string[]
  setImagesToCombineWrong: (imagesToCombineWrong: string[]) => void

  imagesToCombineRandomOrder: string[]
  setImagesToCombineRandomOrder: (imagesToCombineRandomOrder: string[]) => void

  correctAnswers: boolean[]
  setCorrectAnswers: (correctAnswers: boolean[]) => void

  correct: boolean
  onSolve: (
    answersGiven: Map<Number, boolean>,
    correctAnswers: boolean[],
    all: string[],
  ) => boolean
}

export const useQuestStore = create<QuestState>()(set => ({
  task: '',
  setTask: task => set(() => ({ task })),

  imageToBeCombined: '',
  setImageToBeCombined: (imageToBeCombined: string) =>
    set(() => ({ imageToBeCombined })),

  imagesToCombineRight: [],
  setImagesToCombineRight: (imagesToCombineRight: string[]) =>
    set(() => ({ imagesToCombineRight })),

  imagesToCombineWrong: [],
  setImagesToCombineWrong: (imagesToCombineWrong: string[]) =>
    set(() => ({ imagesToCombineWrong })),

  imagesToCombineRandomOrder: [],
  setImagesToCombineRandomOrder: (imagesToCombineRandomOrder: string[]) =>
    set(() => ({ imagesToCombineRandomOrder })),

  correctAnswers: [],
  setCorrectAnswers: (correctAnswers: boolean[]) =>
    set(() => ({ correctAnswers })),

  correct: false,
  onSolve: (answersGiven, correctAnswers, all) => {
    let correct = true
    for (let i = 0; i < all.length; i++) {
      if (answersGiven.get(i) == false) {
        if (correctAnswers[i]) {
          correct = false
        } else {
          correct = correct && true
        }
      }
      if (answersGiven.get(i) == true) {
        if (correctAnswers[i]) {
          correct = correct && true
        } else {
          correct = false
        }
      }
    }
    set(() => ({ correct }))
    return correct
  },
}))
