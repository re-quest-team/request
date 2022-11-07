import { createToast, deleteToast, updateToast } from '@/components/Toasts'
import { APIError, RequestGame, RequestRoom } from '@/types'
import { Game } from '@prisma/client'
import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import { createGame } from './createGame'
import { deleteGame } from './deleteGame'
import { updateGame } from './updateGame'
import { updateRoomOrder } from './updateRoomOrder'

const useGame = (gameId: string) => {
  const { data: game, mutate } = useSWR<RequestGame>(`/api/game/${gameId}`)

  const mutation = async (
    request: Promise<AxiosResponse<RequestGame, APIError>>,
  ) => {
    const { data: game } = await request
    mutate(game, {
      populateCache: false,
      revalidate: true,
    })
  }

  const APICreateGame = async () => {
    const createGameRequest = createGame()
    createToast(createGameRequest)
    await mutation(createGameRequest)
    return await (
      await createGameRequest
    ).data
  }

  const APIUpdateGame = async (game: Partial<Game>) => {
    const updateGameRequest = updateGame(gameId, game)
    updateToast(updateGameRequest)
    await mutation(updateGameRequest)
  }

  const APIDeleteGame = async () => {
    const deleteGameRequest = deleteGame(gameId)
    deleteToast(deleteGameRequest)
    await mutation(deleteGameRequest)
  }

  const APIUpdateGameRooms = async (rooms: RequestRoom[]) => {
    const updateGameRoomsRequest = updateRoomOrder(gameId, rooms)
    updateToast(updateGameRoomsRequest)
    await mutation(updateGameRoomsRequest)
  }

  return {
    game,
    mutate,
    createGame: APICreateGame,
    updateGame: APIUpdateGame,
    deleteGame: APIDeleteGame,
    updateGameRooms: APIUpdateGameRooms,
  }
}

export default useGame
