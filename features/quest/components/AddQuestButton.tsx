import { Transition } from '@headlessui/react'
import { CodeIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Fragment, RefObject } from 'react'
import { Instagram } from 'react-feather'

type AddQuestButtonProps = {
  dragRef: RefObject<HTMLElement>
  x: number
  y: number
  onMoveEnd: ({ x, y }: { x: number; y: number }) => any
  onDelete: () => any
  showDelete: boolean
  onClick: () => any
  type?: keyof typeof bgVariant
}

const bgVariant = {
  default: 'border-white bg-white text-white',
  quest: 'border-flamingo-500 bg-flamingo-500 text-flamingo-500',
  media: 'border-emerald-500 bg-emerald-500 text-emerald-500',
}

const AddQuestButton = ({
  dragRef,
  x,
  y,
  onMoveEnd,
  onDelete,
  showDelete,
  onClick,
  type = 'default',
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
        bgVariant[type],
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
      {type === 'default' && <PlusIcon className="h-10 w-10" />}
      {type === 'media' && <Instagram className="h-10 w-10" />}
      {type === 'quest' && <CodeIcon className="h-10 w-10" />}
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
