import { Transition } from '@headlessui/react'
import {
  CalculatorIcon,
  ChartSquareBarIcon,
  CodeIcon,
  LockClosedIcon,
  MenuAlt1Icon,
  PhotographIcon,
  PlusIcon,
  PuzzleIcon,
  QrcodeIcon,
  TrashIcon,
  ViewListIcon,
} from '@heroicons/react/outline'
import { QuestType } from '@prisma/client'
import clsx from 'clsx'
import { Fragment, RefObject } from 'react'
import { Instagram, Youtube } from 'react-feather'

type AddQuestButtonProps = {
  dragRef: RefObject<HTMLElement>
  x: number
  y: number
  onMoveEnd: ({ x, y }: { x: number; y: number }) => any
  onDelete: () => any
  showDelete: boolean
  onClick: () => any
  type?: QuestType
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
    case 'QUEST_MULTIPLE_CHOICE':
      return <ViewListIcon className="h-10 w-10" />
    case 'QUEST_CODING':
      return <CodeIcon className="h-10 w-10" />
    case 'QUEST_QR_SCAN':
      return <QrcodeIcon className="h-10 w-10" />
    case 'QUEST_STATISTICS':
      return <ChartSquareBarIcon className="h-10 w-10" />
    case 'QUEST_NUMBER_INPUT':
      return <CalculatorIcon className="h-10 w-10" />
    case 'QUEST_GAP_TEXT':
      return <PuzzleIcon className="h-10 w-10" />
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

const AddQuestButton = ({
  dragRef,
  x,
  y,
  onMoveEnd,
  onDelete,
  showDelete,
  onClick,
  type,
}: AddQuestButtonProps) => (
  <Transition
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
        type?.includes('QUEST')
          ? bgVariant.quest
          : type?.includes('MEDIA')
          ? bgVariant.media
          : bgVariant.default,
      )}
      style={{ top: `${y * 100}%`, left: `${x * 100}%` }}
      onDragEnd={e => {
        e.preventDefault()
        const movedQuest = {
          // @ts-ignore
          x:
            (e.clientX - dragRef.current?.getBoundingClientRect().left!) /
            dragRef.current?.clientWidth!,
          // @ts-ignore
          y:
            (e.clientY - dragRef.current?.getBoundingClientRect().top!) /
            dragRef.current?.clientHeight!,
        }
        if (
          movedQuest.x <= 1 &&
          movedQuest.x >= 0 &&
          movedQuest.y <= 1 &&
          movedQuest.y >= 0
        )
          onMoveEnd(movedQuest)
      }}
      onDrop={e => e.preventDefault()}
      onDragOver={e => e.preventDefault()}
      onClick={onClick}
      draggable
    >
      {renderIcon(type)}
      {showDelete && (
        <div
          className="absolute -top-4 -right-4 rounded-full border-2 border-rose-700 bg-rose-400 bg-opacity-95 p-1 shadow"
          onClick={e => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <TrashIcon className="h-4 w-4 text-rose-700" />
        </div>
      )}
    </div>
  </Transition>
)

export default AddQuestButton
