import { Transition } from '@headlessui/react'
import {
  ChartSquareBarIcon,
  CodeIcon,
  LockClosedIcon,
  MenuAlt1Icon,
  PhotographIcon,
  PlusIcon,
  QrcodeIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { Quest, QuestType } from '@prisma/client'
import clsx from 'clsx'
import { type } from 'os'
import { Fragment } from 'react'
import { Instagram, Youtube } from 'react-feather'

type PlayQuestButtonProps = {
  quest: Quest
  onClick: () => any
}

const bgVariant = {
  default: 'border-white bg-white text-white',
  quest: 'border-flamingo-500 bg-flamingo-500 text-flamingo-500',
  media: 'border-emerald-500 bg-emerald-500 text-emerald-500',
}

const renderIcon = (type?: QuestType) => {
  switch (type) {
    case 'QUEST_CRYPTO':
      return <LockClosedIcon className="h-10 w-10" />
    case 'QUEST_CODING':
      return <CodeIcon className="h-10 w-10" />
    case 'QUEST_QR_SCAN':
      return <QrcodeIcon className="h-10 w-10" />
    case 'QUEST_STATISTICS':
      return <ChartSquareBarIcon className="h-10 w-10" />
    case 'MEDIA_TEXT':
      return <MenuAlt1Icon className="h-10 w-10" />
    case 'MEDIA_IMAGE':
      return <PhotographIcon className="h-10 w-10" />
    case 'MEDIA_INSTAGRAM':
      return <Instagram className="h-10 w-10" />
    case 'MEDIA_YOUTUBE':
      return <Youtube className="h-10 w-10" />
    case 'MEDIA_IFRAME':
      return <CodeIcon className="h-10 w-10" />
    default:
      return <PlusIcon className="h-10 w-10" />
  }
}

const PlayQuestButton = ({ quest, onClick }: PlayQuestButtonProps) => {
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
          quest.type?.includes('QUEST')
            ? bgVariant.quest
            : quest.type?.includes('MEDIA')
            ? bgVariant.media
            : bgVariant.default,
        )}
        style={{ top: `${quest.y * 100}%`, left: `${quest.x * 100}%` }}
        onClick={onClick}
      >
        {renderIcon(quest.type || undefined)}
      </div>
    </Transition>
  )
}

export default PlayQuestButton
