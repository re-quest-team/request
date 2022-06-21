import create from 'zustand'

interface ImageState {
  link: string
  setLink: (text: string) => void
}

export const useImageStore = create<ImageState>()(set => ({
  link: '',
  setLink: text => set(() => ({ link: text })),
}))
