import React from 'react'
import RoomView from '@/features/room/components/RoomView'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { id: string[] } }) {
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

  if (!roomId) {
    redirect(`/play/${gameId}/${game?.rooms[0].id!}`)
  }

  return <RoomView id={game?.rooms[0].id!} />
}
