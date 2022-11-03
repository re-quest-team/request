import { Button } from '@/components/Elements/Button'
import RoomView from '@/features/room/components/RoomView'
import { RoomWithImageAndQuests } from '@/features/room/types'
import { useGameplayStore } from '@/stores/gameplay'
import { Game } from '@prisma/client'
import { AxiosError } from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { FormattedMessage } from 'react-intl'
import { RequestGame } from '@/types'

const GameView = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [gameId, setGameId] = useState('')
  const [roomId, setRoomId] = useState('')

  const [index, setIndex] = useState(0)

  const { startGame } = useGameplayStore()

  useEffect(() => {
    startGame()
  }, [startGame])

  const { data: game } = useSWR<RequestGame, AxiosError>(
    `/api/public/game/${gameId}`,
  )

  useEffect(() => {
    if (pathname.id && Array.isArray(router.query.id)) {
      if (router.query.id.length > 1) {
        setRoomId(router.query.id[1])
      }
      setGameId(router.query.id[0])
    } else if (router.query.id) {
      setGameId(router.query.id)
    }
  }, [router.query.id])

  useEffect(() => {
    const redirect = async () => {
      if (game && !game?.rooms[index]) {
        router.push(`/play/success`)
      } else {
        router.replace(`/play/${game?.id}/${game?.rooms[index].id}`)
      }
    }

    if (game) redirect().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, index])

  if (roomId) {
    return (
      <div className="relative">
        <div className="absolute z-10 m-4 rounded-xl bg-zinc-900 p-4 text-white">
          <Button onClick={() => setIndex(index + 1)}>Nächster Raum</Button>
        </div>
        <RoomView id={roomId} />
      </div>
    )
  }
}

export default GameView
