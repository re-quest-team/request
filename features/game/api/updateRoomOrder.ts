import axios from '@/lib/axios'
import { APIError, RequestGame, RequestRoom } from '@/types'
import { AxiosResponse } from 'axios'

export const updateRoomOrder = (gameId: string, update: RequestRoom[]) => {
  return axios.put<RequestRoom[], AxiosResponse<RequestGame, APIError>>(
    `/api/game/${gameId}/rooms`,
    update,
  )
}
