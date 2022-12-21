import RoomPanel from '@/features/room/components/RoomPanel'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RoomStudio({
  params,
}: {
  params: { id: string[] }
}) {
  const [gameId, roomId] = params.id

  const session = await getSession(headers().get('cookie') ?? '')

  const game = await prisma.game.findFirst({
    where: {
      id: gameId,
    },
    include: {
      rooms: true,
    },
  })

  if (game?.userId !== session?.user.id) {
    return redirect('/')
  }

  if (!roomId) {
    // create first room if not exists
    if (game?.rooms.length === 0) {
      await prisma.room.create({
        data: {
          gameId: game.id,
          index: game.rooms.length,
        },
      })
    }

    return redirect(`/studio/edit/${gameId}/${game?.rooms[0].id!}`)
  }

  if (roomId) return <RoomPanel gameId={gameId} roomId={roomId} />
}
