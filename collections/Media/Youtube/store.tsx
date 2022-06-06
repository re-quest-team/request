import create from 'zustand'

interface YoutubeState {
  store: string
  setStore: (text: string) => void
}

export type Timestamp = {
  hrs: string
  min: string
  sec: string
}

interface YoutubeTimeState {
  store: Timestamp
  setStore: (value: Timestamp) => void
}

export const useYoutubeStoreEmbedLink = create<YoutubeState>()(set => ({
  store: '',
  setStore: link => set(() => ({ store: link })),
}))

export const useYoutubeStoreStartTimestamp = create<YoutubeTimeState>()(
  set => ({
    store: { hrs: '', min: '', sec: '' },
    setStore: start => set(() => ({ store: start })),
  }),
)

export const useYoutubeStoreEndTimestamp = create<YoutubeTimeState>()(set => ({
  store: { hrs: '', min: '', sec: '' },
  setStore: end => set(() => ({ store: end })),
}))
