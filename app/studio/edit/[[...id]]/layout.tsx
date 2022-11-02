import { Spacer } from '@/components/Elements/Spacer'
import GameForm from '@/features/game/components/GameForm'
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

  const game = await prisma.game.findFirst({
    where: {
      id: gameId,
    },
    include: {
      rooms: {
        include: {
          image: true,
        },
      },
    },
  })

  if (!game) throw new Error('not found')

  return (
    <>
      <GameForm id={game.id} />
      <div className="flex space-x-4">
        <div className="w-28">
          <RoomSidebar game={game} current={roomId} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <Spacer></Spacer>
    </>
  )
}
