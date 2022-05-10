import axios from '@/lib/axios'
import { Room } from '@prisma/client'

export const deleteRoom = (roomId: string) => {
  return axios.delete<Room>(`/api/room/${roomId}`)
}
