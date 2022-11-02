import axios from '@/lib/axios'
import { Game } from '@prisma/client'

export const updateGame = (gameId: string, update: Partial<Game>) => {
  return axios.put<Game>(`/api/game/${gameId}`, update)
}
