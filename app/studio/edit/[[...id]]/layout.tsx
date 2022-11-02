import { Spacer } from '@/components/Elements/Spacer'
import RoomSidebar from '@/features/room/components/GameRoomSidebar'
import prisma from '@/lib/prisma'

export default async function Layout({
  params,
  children,
}: {
  params: { id: string[] }
  children: React.ReactNode
}) {
  const [gameId, roomId] = params.id

  const data = await prisma.game.findFirst({
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

  if (!data) throw new Error('not found')

  return (
    <>
      <div className="flex space-x-4">
        <div className="w-28">
          <RoomSidebar game={data} current={roomId} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <Spacer></Spacer>
    </>
  )
}
