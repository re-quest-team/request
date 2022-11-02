import { Spacer } from '@/components/Elements/Spacer'
import RoomSidebar from '@/features/room/components/GameRoomSidebar'
import RoomPanel from '@/features/room/components/RoomPanel'
import prisma from '@/lib/prisma'

export default async function RoomStudio({
  params,
}: {
  params: { id: string[] }
}) {
  const [gameId, roomId] = params.id

  const data = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      quests: true,
      image: true,
    },
  })

  if (!data) throw new Error('not found')

  return <RoomPanel room={data} />
}
