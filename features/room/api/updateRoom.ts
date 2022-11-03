import axios from '@/lib/axios'
import { APIError, RequestRoom } from '@/types'
import { AxiosResponse } from 'axios'

export const updateRoom = (roomId: string, data: Partial<RequestRoom>) => {
  return axios.post<Partial<RequestRoom>, AxiosResponse<RequestRoom, APIError>>(
    `/api/room/${roomId}`,
    data,
  )
}
