'use client'

import { PillButton } from '@/components/Elements/Button'
import reorder from '@/utils/reorder'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Game, Room, S3Image } from '@prisma/client'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { createRoom } from '../api/createRoom'
import { RoomWithImage } from '../types'
import RoomPanel from './RoomPanel'
import { createToast } from '@/components/Toasts'
import { FormattedMessage, useIntl } from 'react-intl'
import { resetServerContext } from 'react-beautiful-dnd'
import Link from 'next/link'
import useEditGameStore from '@/stores/edit'
import clsx from 'clsx'

type RoomListProps = {
  game: Game & {
    rooms: Room[]
  }
  current: string
}

resetServerContext()

const RoomSidebar = ({ game, current }: RoomListProps) => {
  const [rooms, setRooms] = useState<RoomWithImage[]>(game.rooms)

  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useEditGameStore()

  useEffect(() => {
    enterRoom(game.id)
    return () => {
      leaveRoom(game.id)
    }
  }, [enterRoom, leaveRoom])

  const others = useEditGameStore(state => state.liveblocks.others)
  const othersPresence = others.map(user => user.presence.gameRoom)

  console.log(othersPresence)

  return (
    <>
      <DragDropContext
        onDragEnd={result => {
          // dropped outside the list
          if (!result.destination) {
            return
          }

          const roomItems = reorder(
            rooms,
            result.source.index,
            result.destination.index,
          )

          setRooms(roomItems)
        }}
      >
        <Droppable droppableId="droppable" direction="vertical">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="relative py-4"
            >
              <div className="relative flex flex-col">
                {rooms.map((r, i) => (
                  <Draggable key={r.id} draggableId={r.id} index={i}>
                    {(provided, snapshot) => (
                      <Link
                        href={`studio/edit/${game.id}/${r.id}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={clsx(
                          `relative mx-auto my-2 w-full max-w-6xl overflow-visible`,
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={clsx(
                            'select-none rounded shadow',
                            current === r.id && 'border-2 border-blue-500',
                            othersPresence.includes(r.id) &&
                              'outline outline-2 outline-offset-4 outline-orange-500',
                          )}
                          src={
                            r.image
                              ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${r?.image?.url}`
                              : ''
                          }
                          alt="upload"
                          onDrop={e => e.preventDefault()}
                          onDragOver={e => e.preventDefault()}
                        />
                      </Link>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PillButton
        startIcon={<PlusIcon className="h-8 w-8" />}
        className="mx-auto"
        onClick={async () => {
          const createRoomRequest = createRoom({ gameId: game.id })
          createToast(createRoomRequest)
          const newRoom = await (await createRoomRequest).data
          setRooms([...rooms, newRoom])
        }}
      ></PillButton>
    </>
  )
}

export default RoomSidebar
