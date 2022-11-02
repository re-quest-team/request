import { Spacer } from '@/components/Elements/Spacer'
import RoomSidebar from '@/features/room/components/RoomSidebar'
import RoomPanel from '@/features/room/components/RoomPanel'
import prisma from '@/lib/prisma'
import { useRouter } from 'next/navigation'
import RoomRedirect from '@/features/room/components/RoomRedirect'

export default async function RoomStudio({
  params,
}: {
  params: { id: string[] }
}) {
  const [gameId, roomId] = params.id

  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      quests: true,
      image: true,
    },
  })

  if (!roomId) {
    const game = await prisma.game.findFirst({
      where: {
        id: gameId,
      },
      include: {
        rooms: true,
      },
    })

    return <RoomRedirect gameId={gameId} roomId={game?.rooms[0].id!} />
  }

  if (room) return <RoomPanel room={room} />
}
