import NextRoomButton from '@/features/play/components/NextRoomButton'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Layout({
  params,
  children,
}: {
  params: { id: string[] }
  children: React.ReactNode
}) {
  const [gameId, roomId] = params.id

  const game = await prisma.game.findFirst({
    include: {
      rooms: {
        include: {
          image: true,
          quests: true,
        },
      },
    },
    where: {
      id: gameId,
    },
  })

  if (!game) {
    redirect(`/`)
  }

  if (!roomId) {
    redirect(`/play/${gameId}/${game?.rooms[0].id!}`)
  }

  return (
    <div className="relative">
      <div className="absolute z-10 m-4 rounded-xl bg-zinc-900 p-4 text-white">
        {roomId && <NextRoomButton game={game} curRoomId={roomId} />}
      </div>
      {children}
    </div>
  )
}
