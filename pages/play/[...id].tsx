import { Button } from '@/components/Elements/Button'
import RoomView from '@/features/room/components/RoomView'
import { RoomWithImageAndQuests } from '@/features/room/types'
import { Game } from '@prisma/client'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const GameView = () => {
  const router = useRouter()
  const [gameId, setGameId] = useState('')
  const [roomId, setRoomId] = useState('')

  const [index, setIndex] = useState(0)

  const { data: game } = useSWR<
    Game & {
      rooms: RoomWithImageAndQuests[]
    },
    AxiosError
  >(`/api/game/${gameId}`)

  useEffect(() => {
    if (router.query.id && Array.isArray(router.query.id)) {
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
      if (!game?.rooms[index]) {
        router.push('/')
      } else {
        router.replace(`/play/${game?.id}/${game?.rooms[index].id}`)
      }
    }

    redirect().catch(console.error)
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
