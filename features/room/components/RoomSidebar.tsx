/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/Elements/Button'
import reorder from '@/utils/reorder'
import { PhotoIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { createRoom } from '../api/createRoom'
import { createToast } from '@/components/Toasts'
import useEditGameStore from '@/stores/edit'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import useGame from '@/features/game/api/useGame'
import { RequestRoom } from '@/types'

type RoomListProps = {
  gameId: string
  current: string
}

const RoomSidebar = ({ gameId, current }: RoomListProps) => {
  const router = useRouter()

  const { game, mutate, updateGameRooms } = useGame(gameId)
  const [rooms, setRooms] = useState<RequestRoom[] | undefined>(game?.rooms)

  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useEditGameStore()

  useEffect(() => setRooms(game?.rooms), [game])

  useEffect(() => {
    if (!game) return

    enterRoom(game.id)
    return () => {
      leaveRoom(game.id)
    }
  }, [enterRoom, leaveRoom])

  const others = useEditGameStore(state => state.liveblocks.others)
  const othersPresence = others.map(user => user.presence.gameRoom)

  const onCreateRoom = async () => {
    if (!game) return
    const createRoomRequest = createRoom({ gameId: game.id })
    createToast(createRoomRequest)
    const newRoom = (await createRoomRequest).data
    mutate()
    router.replace(`/studio/edit/${gameId}/${newRoom.id}`)
  }

  if (!game) return <div></div>

  return (
    <>
      <DragDropContext
        onDragEnd={async result => {
          // dropped outside the list
          if (!result.destination) {
            return
          }
          const roomItems = reorder(
            game.rooms,
            result.source.index,
            result.destination.index,
          )
          updateGameRooms(roomItems)
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
              <div className="relative flex h-full flex-col">
                {rooms &&
                  rooms.map((r, i) => (
                    <Draggable key={r.id} draggableId={r.id} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={clsx(
                            `relative mx-auto my-2  flex aspect-video w-full max-w-6xl select-none items-center justify-center overflow-visible rounded bg-zinc-800 p-2 shadow`,
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
                          <div className="absolute right-0 bottom-0 flex flex-row-reverse p-1">
                            {othersPresence
                              .filter(p => p === r.id)
                              .map((o, i) => (
                                <div
                                  key={i}
                                  className={clsx(
                                    'h-4 w-4 rounded-full border-[1px] border-white bg-orange-500 shadow',
                                  )}
                                  style={{
                                    transform: `translateX(${i / 2}rem)`,
                                  }}
                                />
                              ))}
                          </div>
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
      <Button
        startIcon={<PlusIcon className="h-4 w-4" />}
        className="mx-auto"
        size="sm"
        onClick={onCreateRoom}
      >
        Raum
      </Button>
    </>
  )
}

export default RoomSidebar
