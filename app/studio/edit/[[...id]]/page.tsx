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

  if (!roomId) {
    const game = await prisma.game.findFirst({
      where: {
        id: gameId,
      },
      include: {
        rooms: true,
      },
    })

    // create first room if not exists
    if (game?.rooms.length === 0) {
      await prisma.room.create({
        data: {
          gameId: game.id,
          index: game.rooms.length,
        },
      })
    }

    return <RoomRedirect gameId={gameId} roomId={game?.rooms[0].id!} />
  }

  if (roomId) return <RoomPanel gameId={gameId} roomId={roomId} />
}
