import { createToast, deleteToast, updateToast } from '@/components/Toasts'
import useGame from '@/features/game/api/useGame'
import { APIError, RequestRoom } from '@/types'
import { Room } from '@prisma/client'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { createRoom } from './createRoom'
import { deleteRoom } from './deleteRoom'
import { updateRoom } from './updateRoom'

const useRoom = (roomId: string) => {
  const { data: room, mutate } = useSWR<RequestRoom>(`/api/room/${roomId}`)

  const { mutate: mutateGame } = useGame(room?.gameId || '')

  const mutation = async (
    request: Promise<AxiosResponse<RequestRoom, APIError>>,
  ) => {
    const { data: room } = await request
    mutate(room, {
      populateCache: false,
      revalidate: true,
    })

    mutateGame()
  }

  const APICreateRoom = async (room: Partial<Room>) => {
    const createRoomRequest = createRoom(room)
    createToast(createRoomRequest)
    await mutation(createRoomRequest)
    return await (
      await createRoomRequest
    ).data
  }

  const APIUpdateRoom = async (id: string, room: Partial<Room>) => {
    const updateRoomRequest = updateRoom(id, room)
    updateToast(updateRoomRequest)
    await mutation(updateRoomRequest)
  }

  const APIDeleteRoom = async (id: string) => {
    const deleteRoomRequest = deleteRoom(id)
    deleteToast(deleteRoomRequest)
    await mutation(deleteRoomRequest)
  }

  const onImageChange = async () => {
    mutateGame()
  }

  return {
    room,
    mutate,
    onImageChange,
    createRoom: APICreateRoom,
    updateRoom: APIUpdateRoom,
    deleteRoom: APIDeleteRoom,
  }
}

export default useRoom
