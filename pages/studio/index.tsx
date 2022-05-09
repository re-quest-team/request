import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import prisma from '@/lib/prisma'
import { Game } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  const games = await prisma.game.findMany({
    where: {
      userId: session?.user.id,
    },
  })
  return { props: { games } }
}

const Studio = ({ games }: { games: Game[] }) => {
  return (
    <div>
      <Link href={'/studio/new'} passHref>
        <Button>Neues re:quest erstellen</Button>
      </Link>

      <Spacer />

      <h1 className="text-xl">Meine re:quests</h1>
      {games.map(g => (
        <Link href={`/studio/${g.id}`} passHref key={g.id}>
          <Button>{g.name}</Button>
        </Link>
      ))}
    </div>
  )
}

export default Studio
