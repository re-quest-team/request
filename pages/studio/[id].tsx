import type { NextPage } from 'next'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { PillButton } from '@/components/Elements/Button'
import { PlusIcon } from '@heroicons/react/outline'
import { Spacer } from '@/components/Elements/Spacer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import RoomPanel from '@/features/room/components/RoomPanel'
import GameForm from '@/features/game/components/GameForm'
import reorder from '@/utils/reorder'

const Studio: NextPage = () => {
  const [rooms, setRooms] = useState<{ id: string }[]>([])
  const router = useRouter()
  const [gameId, setGameId] = useState('')

  useEffect(() => {
    if (router.query.id && Array.isArray(router.query.id)) {
      setGameId(router.query.id[0])
    } else if (router.query.id) {
      setGameId(router.query.id)
    }
  }, [router.query.id])

  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
      <div className="mx-auto md:max-w-4xl">
        <GameForm id={gameId} />
      </div>
      <Spacer></Spacer>
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
        onClick={() =>
          setRooms([...rooms, { id: new Date().getTime().toString() }])
        }
      >
        Raum hinzufügen
      </PillButton>
    </div>
  )
}

export default Studio
