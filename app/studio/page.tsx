import { Button, PillButton } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import GamePanel from '@/features/game/components/GamePanel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'
import { FormattedMessage } from 'react-intl'

import prisma from '@/lib/prisma'

export default async function Studio() {
  // const { data } = useSWR<Game[]>('/api/game')

  const games = await prisma.game.findMany({
    include: {
      rooms: {
        include: {
          image: true,
        },
      },
    },
  })

  return (
    <div>
      <Link href={'/studio/new'} passHref>
        <Button>New Quest</Button>
      </Link>

      <Spacer />

      {games &&
        games?.map(g => (
          <div className="flex w-full flex-col" key={g.id}>
            <div className="mt-4 flex flex-row">
              <Link href={`/studio/edit/${g.id}`} passHref>
                <Button>Edit</Button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}
