import axios from '@/lib/axios'
import { RequestGame } from '@/types'

export const deleteGame = (gameId: string) => {
  return axios.delete<RequestGame>(`/api/game/${gameId}`)
}
