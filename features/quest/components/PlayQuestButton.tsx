import { Transition } from '@headlessui/react'
import {
  Bars3CenterLeftIcon,
  CalculatorIcon,
  ChartBarSquareIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  ListBulletIcon,
  LockClosedIcon,
  PhotoIcon,
  PlusIcon,
  PuzzlePieceIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import { Quest, QuestType } from '@prisma/client'
import clsx from 'clsx'
import { type } from 'os'
import { Fragment } from 'react'
import { Instagram, Youtube } from 'react-feather'

type PlayQuestButtonProps = {
  quest: Quest
  onClick: () => any
  solved?: boolean
}

const bgVariant = {
  default: 'border-white bg-white text-white',
  quest: 'border-flamingo-500 bg-flamingo-500 text-flamingo-500',
  media: 'border-emerald-500 bg-emerald-500 text-emerald-500',
  solved: 'border-white bg-white text-white',
}

const renderIcon = (type?: QuestType) => {
  console.log(type)
  switch (type) {
    case 'QUEST_CRYPTO':
      return <LockClosedIcon className="h-10 w-10" />
    case 'QUEST_MULTIPLE_CHOICE':
      return <ListBulletIcon className="h-10 w-10" />
    case 'QUEST_SINGLE_CHOICE':
      return <ListBulletIcon className="h-10 w-10" />
    case 'QUEST_CODING':
      return <CodeBracketIcon className="h-10 w-10" />
    case 'QUEST_QR_SCAN':
      return <QrCodeIcon className="h-10 w-10" />
    case 'QUEST_STATISTICS':
      return <ChartBarSquareIcon className="h-10 w-10" />
    case 'QUEST_NUMBER_INPUT':
      return <CalculatorIcon className="h-10 w-10" />
    case 'QUEST_GAP_TEXT':
      return <PuzzlePieceIcon className="h-10 w-10" />
    case 'MEDIA_TEXT':
      return <Bars3CenterLeftIcon className="h-10 w-10" />
    case 'MEDIA_IMAGE':
      return <PhotoIcon className="h-10 w-10" />
    case 'MEDIA_INSTAGRAM':
      return <Instagram className="h-10 w-10" />
    case 'MEDIA_YOUTUBE':
      return <Youtube className="h-10 w-10" />
    case 'MEDIA_IFRAME':
      return <CodeBracketIcon className="h-10 w-10" />
    default:
      return <PlusIcon className="h-10 w-10" />
  }
}

const PlayQuestButton = ({ quest, onClick, solved }: PlayQuestButtonProps) => {
  return (
    <Transition
      show={true}
      as={Fragment}
      appear={true}
      enter="transition-all duration-100"
      enterFrom="opacity-0 scale-75"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          `pointer-events-auto absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-2xl border-4 bg-opacity-50 shadow backdrop-blur`,
          solved
            ? bgVariant.solved
            : quest.type?.includes('QUEST')
            ? bgVariant.quest
            : quest.type?.includes('MEDIA')
            ? bgVariant.media
            : bgVariant.default,
        )}
        style={{ top: `${quest.y * 100}%`, left: `${quest.x * 100}%` }}
        onClick={onClick}
      >
        {solved && <CheckCircleIcon className="h-10 w-10" />}
        {!solved && renderIcon(quest.type || undefined)}
      </div>
    </Transition>
  )
}

export default PlayQuestButton
