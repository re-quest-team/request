import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import Link from 'next/link'
import { headers } from 'next/headers'

import prisma from '@/lib/prisma'
import { getSession } from '@/lib/session'
import CreateGameButton from '@/features/game/components/CreateGameButton'

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
            <Link href={`/play/${g.id}`} passHref>
              <Button>Spielen</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
