import axios from '@/lib/axios'
import { APIError, RequestGame } from '@/types'
import { Game } from '@prisma/client'
import { AxiosResponse } from 'axios'

export const updateGame = (gameId: string, update: Partial<Game>) => {
  return axios.put<Partial<Game>, AxiosResponse<RequestGame, APIError>>(
    `/api/game/${gameId}`,
    update,
  )
}
