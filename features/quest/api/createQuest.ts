import axios from '@/lib/axios'
import { Quest } from '@prisma/client'
import { AxiosResponse } from 'axios'

export const createQuest = (data: Partial<Quest>) => {
  return axios.post<Partial<Quest>, AxiosResponse<Quest>>(`/api/quest`, data)
}
