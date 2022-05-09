import axios from '@/lib/axios'
import { Game } from '@prisma/client'

export const deleteGame = (gameId: string) => {
  return axios.delete<Game>(`/api/game/${gameId}`)
}
