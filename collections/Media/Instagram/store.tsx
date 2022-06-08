import create from 'zustand'

interface InstagramState {
  link: string
  setLink: (text: string) => void
}

export const useInstagramStore = create<InstagramState>()(set => ({
  link: '',
  setLink: text => set(() => ({ link: text })),
}))
