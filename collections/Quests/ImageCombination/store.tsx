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

  imagesSelected: string[]
  setImagesSelected: (imagesSelected: string[]) => void

  correct: boolean
  onSolve: (input: string) => boolean
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  task: 'Hier wird ein Bild vorgegeben, welches durch Kombination von mehreren Teil-Bilden zusammengestellt werden muss.',
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

  imagesSelected: [],
  setImagesSelected: (imagesSelected: string[]) =>
    set(() => ({ imagesSelected })),

  correct: false,
  onSolve: input => {
    const correct = false
    //set(() => ({ correct }))
    return correct
  },
}))
