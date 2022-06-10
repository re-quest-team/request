import { RoomWithImageAndQuests } from '@/features/room/types'
import { Game } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

type GameCardProps = {
  game: Game & {
    rooms: RoomWithImageAndQuests[]
  }
}

const GameCard = ({ game }: GameCardProps) => {
  const intl = useIntl()
  const english = intl.formatMessage({ id: 'languages.english' })
  const german = intl.formatMessage({ id: 'languages.german' })
  return (
    <div className="px-8 py-4 md:basis-1/2 lg:basis-1/3 xl:px-16 xl:py-8">
      <Link href={`/play/${game.id}`} passHref>
        <div className="group relative h-72 cursor-pointer overflow-hidden rounded-lg bg-zinc-800 shadow">
          {game.rooms.length > 0 && game.rooms[0].image?.url && (
            <div className="absolute top-0 left-0 h-full w-full opacity-50 transition-all group-hover:opacity-30">
              {game.rooms[0].image?.url && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${game.rooms[0].image?.url}`}
                  layout="fill"
                  objectFit="cover"
                  alt="game image"
                />
              )}
            </div>
          )}
          <div className="absolute top-0 left-0 mb-4 flex h-full w-full flex-col items-center justify-center">
            <p className="mx-auto text-3xl font-semibold">{game.name}</p>
            <div>{'(' + (game.germanLanguage ? german : english) + ')'}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GameCard
