import { createToast, deleteToast, updateToast } from '@/components/Toasts'
import { Quest } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { mutate } from 'swr'
import { createQuest } from './createQuest'
import { deleteQuest } from './deleteQuest'
import { updateQuest } from './updateQuest'
import { IntlShape } from 'react-intl'

const useQuests = (roomId: string) => {
  const mutation = async (request: Promise<AxiosResponse<Quest>>) => {
    const { data: quest } = await request
    mutate(`/api/room/${roomId}`, quest, {
      populateCache: false,
      revalidate: true,
    })
  }

  const APICreateQuest = async (quest: Partial<Quest>, intl: IntlShape) => {
    const createQuestRequest = createQuest({ ...quest, roomId })
    createToast(createQuestRequest, intl)
    await mutation(createQuestRequest)
    return await (
      await createQuestRequest
    ).data
  }

  const APIUpdateQuest = async (
    id: string,
    quest: Partial<Quest>,
    intl: IntlShape,
  ) => {
    const updateQuestRequest = updateQuest(id, {
      ...quest,
    })
    updateToast(updateQuestRequest, intl)
    await mutation(updateQuestRequest)
  }

  const APIDeleteQuest = async (id: string, intl: IntlShape) => {
    const deleteQuestRequest = deleteQuest(id)
    deleteToast(deleteQuestRequest, intl)
    await mutation(deleteQuestRequest)
  }

  return {
    createQuest: APICreateQuest,
    updateQuest: APIUpdateQuest,
    deleteQuest: APIDeleteQuest,
  }
}

export default useQuests
