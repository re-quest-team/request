import axios from '@/lib/axios'
import { Room } from '@prisma/client'

export const createRoom = (data: Partial<Room>) => {
  return axios.post<Room>(`/api/room`, data)
}
