import { Button, PillButton } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import GamePanel from '@/features/game/components/GamePanel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'
import { FormattedMessage } from 'react-intl'
import { headers } from 'next/headers'

import prisma from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { createGame } from '@/features/game/api/createGame'
import CreateGameButton from '@/features/game/components/CreateGameButton'
import { deleteGame } from '@/features/game/api/deleteGame'

export default async function Studio() {
  const session = await getSession(headers().get('cookie') ?? '')

  const games = await prisma.game.findMany({
    include: {
      rooms: {
        include: {
          image: true,
        },
      },
    },
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <div>
      <CreateGameButton />

      <Spacer />

      {games?.map(g => (
        <div className="flex w-full flex-col" key={g.id}>
          <div className="mt-4 flex flex-row items-center justify-between">
            <p>{g.name || ''}</p>
            <Link href={`/studio/edit/${g.id}`} passHref>
              <Button>Edit</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
