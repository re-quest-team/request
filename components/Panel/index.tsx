import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon, MenuIcon, TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'

resetServerContext()

type BasePanelProps = {
  children: React.ReactElement
  type?: keyof typeof types
  header: string
  onDelete?: () => any
}

type PanelProps = BasePanelProps & {
  provided?: DraggableProvided
  snapshot?: DraggableStateSnapshot
}

type PanelWithOptionalDragHandleProps = BasePanelProps & {
  provided?: DraggableProvided
}

const types = {
  room: {
    border: 'border-dodger-blue',
    bg: 'bg-dodger-blue',
    openText: 'text-dodger-blue',
  },
  quest: {
    border: 'border-flamingo',
    bg: 'bg-flamingo',
    openText: 'text-flamingo',
  },
}

const PanelWithOptionalDragHandle = ({
  children,
  type = 'room',
  provided,
  header,
  onDelete,
}: PanelWithOptionalDragHandleProps) => (
  <div className="py-4">
    <div
      className={clsx(
        'w-full rounded-lg border bg-zinc-900 shadow',
        types[type].border,
      )}
    >
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <div
              className={clsx(
                'flex items-center rounded-t-lg p-4',
                types[type].bg,
                open && types[type].openText,
                open ? 'bg-opacity-30' : 'bg-opacity-90',
              )}
            >
              <Disclosure.Button>
                <ChevronUpIcon
                  className={`mr-2 h-5 w-5 ${
                    !open && 'rotate-180'
                  } transition-all`}
                />
              </Disclosure.Button>
              <span className="flex-1 font-semibold">{header}</span>
              {provided && (
                <div {...provided.dragHandleProps}>
                  <MenuIcon className="mx-2 h-5 w-5" />
                </div>
              )}
              {onDelete && (
                <TrashIcon
                  className="h-5 w-5 cursor-pointer transition-all hover:scale-110"
                  onClick={onDelete}
                />
              )}
            </div>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel static className="p-4">
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  </div>
)

const Panel = ({
  children,
  type = 'room',
  provided,
  snapshot,
  header,
  onDelete,
}: PanelProps) => {
  if (!provided)
    return (
      <PanelWithOptionalDragHandle
        type={type}
        header={header}
        onDelete={onDelete}
      >
        {children}
      </PanelWithOptionalDragHandle>
    )

  return (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <PanelWithOptionalDragHandle
        type={type}
        provided={provided}
        header={header}
        onDelete={onDelete}
      >
        {children}
      </PanelWithOptionalDragHandle>
    </div>
  )
}

export default Panel
