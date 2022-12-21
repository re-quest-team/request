import axios from '@/lib/axios'
import { RequestRoom } from '@/types'

export const deleteRoom = (roomId: string) => {
  return axios.delete<RequestRoom>(`/api/room/${roomId}`)
}
