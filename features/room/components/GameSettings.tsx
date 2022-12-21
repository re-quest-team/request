'use client'

import GameForm from '@/features/game/components/GameForm'
import RoomSettings from './RoomSettings'

type Props = {
  gameId: string
  roomId: string
}

export default function GameSettings({ gameId, roomId }: Props) {
  return (
    <div className="mb-4 flex w-full items-center justify-between space-x-4">
      <GameForm gameId={gameId} />
      <RoomSettings roomId={roomId} />
    </div>
  )
}
