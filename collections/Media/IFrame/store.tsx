import create from 'zustand'

interface IframeState {
  link: string
  height: string
  width: string
  setLink: (link: string) => void
  setHeight: (height: string) => void
  setWidth: (height: string) => void
}

export const useIframeStore = create<IframeState>()(set => ({
  link: '',
  height: '800',
  width: '400',

  setLink: link => set(() => ({ link: link })),
  setHeight: height => set(() => ({ height: height })),
  setWidth: width => set(() => ({ width: width })),
}))
