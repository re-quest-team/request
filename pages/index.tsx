import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import type { NextPage } from 'next'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import {
  AcademicCapIcon,
  AdjustmentsIcon,
  CollectionIcon,
  DeviceMobileIcon,
  PuzzleIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import FeatureCard from '@/components/Card'
import { Game } from '@prisma/client'
import useSWR from 'swr'
import GameCard from '@/features/game/components/GameCard'
import { RoomWithImageAndQuests } from '@/features/room/types'
import { FormattedMessage, useIntl } from 'react-intl'

const Home: NextPage = () => {
  const { data: games } = useSWR<
    (Game & {
      rooms: RoomWithImageAndQuests[]
    })[]
  >('/api/game')

  const intl = useIntl()

  const card1 = intl.formatMessage({ id: 'page.home.card1' })
  const card2 = intl.formatMessage({ id: 'page.home.card2' })
  const card3 = intl.formatMessage({ id: 'page.home.card3' })
  const card4 = intl.formatMessage({ id: 'page.home.card4' })
  const card5 = intl.formatMessage({ id: 'page.home.card5' })
  const card6 = intl.formatMessage({ id: 'page.home.card6' })

  return (
    <div>
      <div className="mx-auto md:max-w-3xl">
        <h1 className="bg-gradient-to-br from-flamingo-600 via-dodger-blue-500 to-emerald-600 bg-clip-text p-2 text-center text-6xl font-bold text-transparent">
          <FormattedMessage id="page.home.title" />
        </h1>
        <Spacer />
        <h2 className="p-2 text-center text-2xl">
          <span className="font-bold">re:quest</span>{' '}
          <FormattedMessage id="page.home.description" />
        </h2>
        <Spacer />
        <Link href={'/studio'} passHref>
          <Button
            endIcon={<ArrowRightIcon className="h-4" />}
            className="mx-auto"
          >
            <FormattedMessage id="page.home.createQuest" />
          </Button>
        </Link>
        <Spacer />
      </div>
      <div className="flex flex-wrap">
        <FeatureCard title={card1} color="bg-red-400" icon={SearchIcon}>
          <FormattedMessage id="page.home.loremIpsum" />
        </FeatureCard>
        <FeatureCard title={card2} color="bg-blue-400" icon={AcademicCapIcon}>
          <FormattedMessage id="page.home.loremIpsum" />
        </FeatureCard>
        <FeatureCard title={card3} color="bg-purple-400" icon={CollectionIcon}>
          <FormattedMessage id="page.home.loremIpsum" />
        </FeatureCard>
        <FeatureCard title={card4} color="bg-pink-400" icon={AdjustmentsIcon}>
          <FormattedMessage id="page.home.loremIpsum" />
        </FeatureCard>
        <FeatureCard
          title={card5}
          color="bg-orange-400"
          icon={DeviceMobileIcon}
        >
          <FormattedMessage id="page.home.loremIpsum" />
        </FeatureCard>
        <FeatureCard title={card6} color="bg-green-400" icon={PuzzleIcon}>
          <FormattedMessage id="page.home.loremIpsum" />
        </FeatureCard>
      </div>
      <Spacer />
      <Link href={'/faq'} passHref>
        <Button
          endIcon={<ArrowRightIcon className="h-4" />}
          className="mx-auto"
        >
          <FormattedMessage id="page.home.moreInformation" />
        </Button>
      </Link>
      <Spacer size="lg" />
      <h2 className="p-2 text-center text-2xl">
        <FormattedMessage id="page.home.examples" />
      </h2>
      <div className="flex flex-col flex-wrap md:flex-row">
        {games?.map(g => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
      <Link href={'/studio'} passHref>
        <Button
          endIcon={<ArrowRightIcon className="h-4" />}
          className="mx-auto"
        >
          <FormattedMessage id="page.home.createQuest" />
        </Button>
      </Link>
    </div>
  )
}

export default Home
