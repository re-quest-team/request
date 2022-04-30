import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import prisma from '@/lib/prisma'
import { Quest } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  const quests = await prisma.quest.findMany({
    where: {
      userId: session?.user.id,
    },
  })
  return { props: { quests } }
}

const Studio = ({ quests }: { quests: Quest[] }) => {
  return (
    <div>
      <Link href={'/studio/new'} passHref>
        <Button>Neues re:quest erstellen</Button>
      </Link>

      <Spacer />

      <h1 className="text-xl">Meine re:quests</h1>
      {quests.map(q => (
        <Link href={`/studio/${q.id}`} passHref key={q.id}>
          <Button>{q.id}</Button>
        </Link>
      ))}
    </div>
  )
}

export default Studio
