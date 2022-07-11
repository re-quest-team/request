import create from 'zustand'

interface IframeState {
  title: string
  link: string
  height: string
  setTitle: (title: string) => void
  setLink: (link: string) => void
  setHeight: (height: string) => void
}

export const useIframeStore = create<IframeState>()(set => ({
  title: '',
  link: '',
  height: '800',

  setTitle: title => set(() => ({ title })),
  setLink: link => set(() => ({ link: link })),
  setHeight: height => set(() => ({ height: height })),
}))
