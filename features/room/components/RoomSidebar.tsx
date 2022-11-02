/* eslint-disable @next/next/no-img-element */
'use client'

import { PillButton } from '@/components/Elements/Button'
import reorder from '@/utils/reorder'
import { PhotoIcon, PlusIcon } from '@heroicons/react/24/outline'
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
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type RoomListProps = {
  game: Game & {
    rooms: Room[]
  }
  current: string
}

const RoomSidebar = ({ game, current }: RoomListProps) => {
  const [rooms, setRooms] = useState<RoomWithImage[]>(game.rooms)

  const router = useRouter()

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
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="relative"
            >
              <div className="relative flex h-full flex-col ">
                {rooms.map((r, i) => (
                  <Draggable key={r.id} draggableId={r.id} index={i}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={clsx(
                          `mx-auto my-2 flex h-20 w-full max-w-6xl select-none items-center justify-center overflow-visible rounded bg-zinc-800 p-2 shadow`,
                          current === r.id && 'border-2 border-blue-500',
                          othersPresence.includes(r.id) &&
                            'outline outline-2 outline-offset-4 outline-orange-500',
                        )}
                        onClick={() =>
                          router.replace(`studio/edit/${game.id}/${r.id}`)
                        }
                      >
                        {r.image && (
                          <img
                            className="rounded"
                            src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${r?.image?.url}`}
                            alt="Room Image"
                            onDrop={e => e.preventDefault()}
                            onDragOver={e => e.preventDefault()}
                          />
                        )}
                        {!r.image && (
                          <PhotoIcon className="h-10 w-10 text-zinc-600" />
                        )}
                      </div>
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
        startIcon={<PlusIcon className="h-4 w-4" />}
        size="sm"
        className="mx-auto"
        onClick={async () => {
          const createRoomRequest = createRoom({ gameId: game.id })
          createToast(createRoomRequest)
          const newRoom = await (await createRoomRequest).data
          setRooms([...rooms, newRoom])
        }}
      >
        Raum
      </PillButton>
    </>
  )
}

export default RoomSidebar
