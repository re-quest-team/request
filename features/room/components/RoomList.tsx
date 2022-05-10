import { PillButton } from '@/components/Elements/Button'
import reorder from '@/utils/reorder'
import { PlusIcon } from '@heroicons/react/outline'
import { Game, Room } from '@prisma/client'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { createRoom } from '../api/createRoom'
import RoomPanel from './RoomPanel'

type RoomListProps = {
  gameId: string
}

const RoomList = ({ gameId }: RoomListProps) => {
  const { data: game } = useSWR<
    Game & {
      rooms: Room[]
    },
    AxiosError
  >(`/api/game/${gameId}`)

  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    if (game && game.rooms) setRooms(game?.rooms)
  }, [game])

  return (
    <>
      <PillButton size="lg" className="mx-auto">
        Räume ({rooms.length})
      </PillButton>
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
              <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full justify-center">
                <div className="h-full w-6 bg-dodger-blue bg-opacity-50"></div>
              </div>
              <div className="relative">
                {rooms.map((r, i) => (
                  <Draggable key={r.id} draggableId={r.id} index={i}>
                    {(provided, snapshot) => (
                      <RoomPanel
                        provided={provided}
                        snapshot={snapshot}
                        index={i + 1}
                        room={r}
                      />
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
          const createRoomRequest = createRoom({ gameId })
          toast.promise(createRoomRequest, {
            loading: 'Speichern',
            success: 'Erfolgreich gespeichert',
            error: 'Fehler beim Speichern',
          })
          const newRoom = await (await createRoomRequest).data
          setRooms([...rooms, newRoom])
        }}
      >
        Raum hinzufügen
      </PillButton>
    </>
  )
}

export default RoomList
