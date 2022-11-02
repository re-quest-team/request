import { createToast, deleteToast, updateToast } from '@/components/Toasts'
import useEditGameStore from '@/stores/edit'
import { Quest, Room, S3Image } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { createQuest } from './createQuest'
import { deleteQuest } from './deleteQuest'
import { updateQuest } from './updateQuest'

const useQuests = (roomId: string) => {
  const sharedQuests = useEditGameStore(state => state.quests)
  const setSharedQuests = useEditGameStore(state => state.setQuests)

  const { data: room } = useSWR<
    Room & {
      quests: Quest[]
      image: S3Image | null
    }
  >(`/api/room/${roomId}`)

  useEffect(() => {
    if (room) setSharedQuests(room?.quests)
  }, [room, setSharedQuests])

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
    quests: sharedQuests,
    createQuest: APICreateQuest,
    updateQuest: APIUpdateQuest,
    deleteQuest: APIDeleteQuest,
  }
}

export default useQuests
