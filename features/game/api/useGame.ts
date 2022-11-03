import { createToast, deleteToast, updateToast } from '@/components/Toasts'
import { APIError, RequestGame } from '@/types'
import { Game } from '@prisma/client'
import { AxiosResponse } from 'axios'
import useSWR, { mutate } from 'swr'
import { createGame } from './createGame'
import { deleteGame } from './deleteGame'
import { updateGame } from './updateGame'

const useGame = (gameId: string) => {
  const { data: game } = useSWR<RequestGame>(`/api/game/${gameId}`)

  const mutation = async (
    request: Promise<AxiosResponse<RequestGame, APIError>>,
  ) => {
    const { data: game } = await request
    mutate(`/api/game/${gameId}`, game, {
      populateCache: false,
      revalidate: true,
    })
  }

  const APICreateGame = async (game: Partial<Game>) => {
    const createGameRequest = createGame()
    createToast(createGameRequest)
    await mutation(createGameRequest)
    return await (
      await createGameRequest
    ).data
  }

  const APIUpdateGame = async (id: string, game: Partial<Game>) => {
    const updateGameRequest = updateGame(id, game)
    updateToast(updateGameRequest)
    await mutation(updateGameRequest)
  }

  const APIDeleteGame = async (id: string) => {
    const deleteGameRequest = deleteGame(id)
    deleteToast(deleteGameRequest)
    await mutation(deleteGameRequest)
  }

  return {
    game,
    createGame: APICreateGame,
    updateGame: APIUpdateGame,
    deleteGame: APIDeleteGame,
  }
}

export default useGame
