import axios from '@/lib/axios'
import { Game } from '@prisma/client'

export const createGame = () => {
  return axios.post<Game>(`/api/game`)
}
