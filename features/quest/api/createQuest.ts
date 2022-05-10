import axios from '@/lib/axios'
import { Quest } from '@prisma/client'

export const createQuest = (data: Partial<Quest>) => {
  return axios.post<Quest>(`/api/quest`, data)
}
