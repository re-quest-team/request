import type { NextPage } from 'next'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Button, PillButton } from '@/components/Elements/Button'
import { PlusIcon } from '@heroicons/react/outline'
import { Spacer } from '@/components/Elements/Spacer'
import { InputField, TextArea } from '@/components/Elements/FormElements'
import { useState } from 'react'
import { Game } from '@prisma/client'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import RoomPanel from '@/components/Quest/QuestPanel'
import toast from 'react-hot-toast'
import axios from 'axios'

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required().min(8),
  })
  .required()

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const Studio: NextPage = () => {
  const [rooms, setRooms] = useState<{ id: string }[]>([])
  const router = useRouter()
  const { data, mutate, isValidating } = useSWR<Game>(
    `/api/game/${router.query.id}`,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async event => {
    const postGameRequest = axios.put<Game>(
      `/api/game/${router.query.id}`,
      event,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    toast.promise(postGameRequest, {
      loading: 'Speichern',
      success: 'Erfolgreich gespeichert',
      error: 'Fehler beim Speichern',
    })
    const updatedGameRequest = await postGameRequest

    const updatedGame = updatedGameRequest.data

    await mutate(updatedGame)
  })

  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
      <div className="mx-auto md:max-w-4xl">
        <form onSubmit={onSubmit}>
          <InputField
            label="Name"
            defaultValue={data?.name ?? ''}
            registration={register('name')}
            error={errors['name']}
          ></InputField>
          <TextArea
            label="Beschreibung"
            rows={4}
            defaultValue={data?.description ?? ''}
            registration={register('description')}
            error={errors['description']}
          />

          <Button
            type="submit"
            disabled={isValidating}
            isLoading={isValidating}
          >
            Speichern
          </Button>
        </form>
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
