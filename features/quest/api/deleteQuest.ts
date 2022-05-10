import axios from '@/lib/axios'
import { Quest } from '@prisma/client'

export const deleteQuest = (id: string) => {
  return axios.delete<Quest>(`/api/quest/${id}`)
}
