import create from 'zustand'

interface IframeState {
  link: string
  setLink: (text: string) => void
  title: string
  setTitle: (title: string) => void
}

export const useIframeStore = create<IframeState>()(set => ({
  link: '',
  setLink: text => set(() => ({ link: text })),
  title: '',
  setTitle: title => set(() => ({ title })),
}))
