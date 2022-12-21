import axios from '@/lib/axios'
import { APIError, RequestRoom } from '@/types'
import { Room } from '@prisma/client'
import { AxiosResponse } from 'axios'

export const createRoom = (data: Partial<Room>) => {
  return axios.post<Partial<Room>, AxiosResponse<RequestRoom, APIError>>(
    `/api/room`,
    data,
  )
}
