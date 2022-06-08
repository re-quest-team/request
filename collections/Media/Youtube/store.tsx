import create from 'zustand'

export type Timestamp = {
  hrs: string
  min: string
  sec: string
}

interface YoutubeState {
  link: string
  start: Timestamp
  end: Timestamp
  setLink: (text: string) => void
  setStart: (text: Timestamp) => void
  setEnd: (text: Timestamp) => void
}

export const useYoutubeStore = create<YoutubeState>()(set => ({
  link: '',
  start: { hrs: '', min: '', sec: '' },
  end: { hrs: '', min: '', sec: '' },
  setLink: link => set(() => ({ link: link })),
  setStart: start => set(() => ({ start: start })),
  setEnd: end => set(() => ({ end: end })),
}))
