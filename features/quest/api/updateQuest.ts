import axios from '@/lib/axios'
import { Quest } from '@prisma/client'

export const updateQuest = (id: string, data: Partial<Quest>) => {
  return axios.put<Quest>(`/api/quest/${id}`, data)
}
