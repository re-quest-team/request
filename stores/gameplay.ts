import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Duration, intervalToDuration } from 'date-fns'

export type GameplayStore = {
  start: Date
  startGame: () => any
  getDuration: () => Duration
}

export const useGameplayStore = create<GameplayStore>()(
  persist(
    (set, get) => ({
      start: new Date(),
      startGame: () =>
        set(() => ({
          start: new Date(),
        })),
      getDuration: () =>
        intervalToDuration({ start: get().start, end: new Date() }),
    }),
    {
      name: 'gameplay-storage', // unique name
    },
  ),
)
