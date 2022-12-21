'use client'

import { Button } from '@/components/Elements/Button'
import { Game, Quest, Room, S3Image } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function NextRoomButton({
  game,
  curRoomId,
}: {
  game: Game & {
    rooms: (Room & {
      image: S3Image | null
      quests: Quest[]
    })[]
  }
  curRoomId: string
}) {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        const curRoomIndex = game?.rooms.findIndex(r => r.id === curRoomId)

        console.log(curRoomIndex === game?.rooms.length! - 1)

        if (
          typeof curRoomIndex === 'undefined' ||
          curRoomIndex === game?.rooms.length! - 1
        ) {
          router.replace(`/`)
          return
        }

        router.replace(`/play/${game?.id}/${game?.rooms[curRoomIndex + 1].id!}`)
      }}
    >
      Nächster Raum
    </Button>
  )
}
