import { Spacer } from '@/components/Elements/Spacer'
import GameForm from '@/features/game/components/GameForm'
import GameSettings from '@/features/room/components/GameSettings'
import RoomSettings from '@/features/room/components/RoomSettings'
import RoomSidebar from '@/features/room/components/RoomSidebar'
import prisma from '@/lib/prisma'

export default async function Layout({
  params,
  children,
}: {
  params: { id: string[] }
  children: React.ReactNode
}) {
  const [gameId, roomId] = params.id

  return (
    <>
      <GameSettings gameId={gameId} roomId={roomId} />
      <div className="flex space-x-4">
        <div className="w-20 sm:w-32 md:w-40">
          <RoomSidebar gameId={gameId} current={roomId} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <Spacer></Spacer>
    </>
  )
}