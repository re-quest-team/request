import axios from '@/lib/axios'
import { RequestRoom } from '@/types'

export const deleteRoomImage = (roomId: string) => {
  return axios.delete<RequestRoom>(`/api/room/${roomId}/image`)
}
