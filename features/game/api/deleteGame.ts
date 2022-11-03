import axios from '@/lib/axios'
import { RequestGame } from '@/types'
import { Game } from '@prisma/client'

export const deleteGame = (gameId: string) => {
  return axios.delete<RequestGame>(`/api/game/${gameId}`)
}
