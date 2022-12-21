import { createToast, deleteToast, updateToast } from '@/components/Toasts'
import { RequestRoom } from '@/types'
import { Quest } from '@prisma/client'
import { AxiosResponse } from 'axios'
import useSWR, { mutate } from 'swr'
import { createQuest } from './createQuest'
import { deleteQuest } from './deleteQuest'
import { updateQuest } from './updateQuest'

const useQuests = (roomId: string) => {
  const { data: room } = useSWR<RequestRoom>(`/api/room/${roomId}`)

  const mutation = async (request: Promise<AxiosResponse<Quest>>) => {
    const { data: quest } = await request
    mutate(`/api/room/${roomId}`, quest, {
      populateCache: false,
      revalidate: true,
    })
  }

  const APICreateQuest = async (quest: Partial<Quest>) => {
    const createQuestRequest = createQuest({ ...quest, roomId })
    createToast(createQuestRequest)
    await mutation(createQuestRequest)
    return await (
      await createQuestRequest
    ).data
  }

  const APIUpdateQuest = async (id: string, quest: Partial<Quest>) => {
    const updateQuestRequest = updateQuest(id, {
      ...quest,
    })
    updateToast(updateQuestRequest)
    await mutation(updateQuestRequest)
  }

  const APIDeleteQuest = async (id: string) => {
    const deleteQuestRequest = deleteQuest(id)
    deleteToast(deleteQuestRequest)
    await mutation(deleteQuestRequest)
  }

  return {
    quests: room?.quests,
    createQuest: APICreateQuest,
    updateQuest: APIUpdateQuest,
    deleteQuest: APIDeleteQuest,
  }
}

export default useQuests
