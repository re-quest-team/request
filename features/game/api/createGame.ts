import axios from '@/lib/axios'
import { APIError, RequestGame } from '@/types'
import { AxiosResponse } from 'axios'

export const createGame = () => {
  return axios.post<{}, AxiosResponse<RequestGame, APIError>>(`/api/game`)
}
