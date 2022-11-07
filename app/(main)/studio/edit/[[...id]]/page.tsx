import RoomPanel from '@/features/room/components/RoomPanel'
import prisma from '@/lib/prisma'
import Redirect from '@/components/Redirect'

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

    return <Redirect to={`/studio/edit/${gameId}/${game?.rooms[0].id!}`} />
  }

  if (roomId) return <RoomPanel gameId={gameId} roomId={roomId} />
}
