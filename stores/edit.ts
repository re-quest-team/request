import create from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'
import { client } from '@/lib/liveblocks'
import { Quest } from '@prisma/client'
import { number } from 'yup'

type GameRoom = string
type Cursor = { x: number; y: number }

type State = {
  gameRoom: string
  setGameRoom: (room: GameRoom) => void
  cursor: Cursor
  setCursor: (cursor: Cursor) => void

  quests: Quest[]
  setQuests: (quests: Quest[]) => void
}

const useEditGameStore = create<WithLiveblocks<State>>()(
  liveblocks(
    set => ({
      gameRoom: '',
      setGameRoom: gameRoom => set({ gameRoom }),
      cursor: { x: 0, y: 0 },
      setCursor: cursor => set({ cursor }),

      quests: [],
      setQuests: quests => set({ quests }),
    }),
    {
      client,
      presenceMapping: {
        gameRoom: true,
        cursor: true,
      },
    },
  ),
)

export default useEditGameStore
