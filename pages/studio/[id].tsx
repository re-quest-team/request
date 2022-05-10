import type { NextPage } from 'next'
import { Spacer } from '@/components/Elements/Spacer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GameForm from '@/features/game/components/GameForm'
import RoomList from '@/features/room/components/RoomList'

const Studio: NextPage = () => {
  const router = useRouter()
  const [gameId, setGameId] = useState('')

  useEffect(() => {
    if (router.query.id && Array.isArray(router.query.id)) {
      setGameId(router.query.id[0])
    } else if (router.query.id) {
      setGameId(router.query.id)
    }
  }, [router.query.id])

  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
      <div className="mx-auto md:max-w-4xl">
        <GameForm id={gameId} />
      </div>
      <Spacer></Spacer>
      <RoomList gameId={gameId} />
    </div>
  )
}

export default Studio
