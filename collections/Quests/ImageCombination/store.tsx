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

  imagesToCombine: string[]
  setImagesToCombine: (imagesToCombine: string[]) => void

  imagesToCombineRandomOrder: string[]
  setImagesToCombineRandomOrder: (imagesToCombineRandomOrder: string[]) => void

  imagesSelected: string[]
  setImagesSelected: (imagesSelected: string[]) => void

  correct: boolean
  onSolve: (
    answers: Map<string, boolean>,
    all: string[],
    right: string[],
  ) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
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

  imagesToCombine: [],
  setImagesToCombine: (imagesToCombine: string[]) =>
    set(() => ({ imagesToCombine })),

  imagesToCombineRandomOrder: [],
  setImagesToCombineRandomOrder: (imagesToCombineRandomOrder: string[]) =>
    set(() => ({ imagesToCombineRandomOrder })),

  imagesSelected: [],
  setImagesSelected: (imagesSelected: string[]) =>
    set(() => ({ imagesSelected })),

  correct: false,
  onSolve: (answers, all, right) => {
    let result = true
    for (let i = 0; i < all.length; i++) {
      if (answers.get(all[i]) === false) {
        if (right.includes(all[i])) {
          result = false
        } else {
          result = result && true
        }
      }
      if (answers.get(all[i]) === true) {
        if (right.includes(all[i])) {
          result = result && true
        } else {
          result = false
        }
      }
    }
    return result
  },
}))
