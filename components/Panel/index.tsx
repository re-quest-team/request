import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon, MenuIcon, TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Draggable } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'

resetServerContext()

type PanelProps = {
  children: React.ReactElement
  type?: keyof typeof types
  draggableId: string
  draggableIndex: number
}

const types = {
  room: {
    border: 'border-re-blue',
    bg: 'bg-re-blue',
    openText: 'text-re-blue',
  },
  quest: {
    border: 'border-re-orange',
    bg: 'bg-re-orange',
    openText: 'text-re-orange',
  },
}

const Panel = ({
  children,
  type = 'room',
  draggableId,
  draggableIndex,
}: PanelProps) => {
  return (
    <Draggable draggableId={draggableId} index={draggableIndex}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div
            className={clsx(
              'my-4 w-full overflow-hidden rounded-lg border shadow',
              types[type].border,
            )}
          >
            <Disclosure defaultOpen={true}>
              {({ open }) => (
                <>
                  <div
                    className={clsx(
                      'flex items-center p-4',
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
                    <span className="flex-1 font-semibold">Panel Header</span>
                    <div {...provided.dragHandleProps}>
                      <MenuIcon className="mx-2 h-5 w-5" />
                    </div>
                    <TrashIcon className="h-5 w-5" />
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
      )}
    </Draggable>
  )
}

export default Panel
