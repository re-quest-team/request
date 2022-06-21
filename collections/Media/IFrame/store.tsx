import create from 'zustand'

interface IframeState {
  link: string
  height: string
  setLink: (link: string) => void
  setHeight: (height: string) => void
}

export const useIframeStore = create<IframeState>()(set => ({
  link: '',
  height: '800',

  setLink: link => set(() => ({ link: link })),
  setHeight: height => set(() => ({ height: height })),
}))
