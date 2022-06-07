import { Button, PillButton } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import GamePanel from '@/features/game/components/GamePanel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'
import { FormattedMessage } from 'react-intl'

const Studio = () => {
  const { data } = useSWR<Game[]>('/api/game')

  console.log(data)

  return (
    <div>
      <Link href={'/studio/new'} passHref>
        <Button>
          <FormattedMessage id="page.studio.index.createNewQuest" />
        </Button>
      </Link>

      <Spacer />

      <h1 className="text-xl">
        <FormattedMessage id="page.studio.index.myQuests" />
      </h1>
      {data && data?.map(g => <GamePanel key={g.id} {...g} />)}
    </div>
  )
}

export default Studio
