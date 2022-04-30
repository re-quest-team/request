import type { NextPage } from 'next'
import Panel from '@/components/Panel'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { PillButton } from '@/components/Elements/Button'
import { PlusIcon } from '@heroicons/react/outline'

import { Spacer } from '@/components/Elements/Spacer'
import { InputField, TextArea } from '@/components/Elements/Input'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { useState } from 'react'
import { SelectOption } from '@/components/Elements/Select'
import FileUpload from '@/components/FileUpload'
import QuestImagePlacer from '@/components/Quest/QuestImagePlacer'

const Studio: NextPage = () => {
  const rooms: SelectOption[] = [
    { value: 'Eigenes Foto hochladen' },
    { value: 'Magisches Klassenzimmer' },
    { value: 'Dunkles Musem' },
    { value: 'Ohne Raum' },
  ]
  const [room, setRoom] = useState(rooms[0])

  const [imageUrl, setImageUrl] = useState('')

  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
      <div className="mx-auto md:max-w-4xl">
        <InputField label="Name"></InputField>
        <TextArea label="Beschreibung" rows={4} />
      </div>
      <Spacer></Spacer>
      <PillButton size="lg" className="mx-auto">
        Räume (2)
      </PillButton>
      <DragDropContext onDragEnd={result => console.log(result)}>
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
                <Panel
                  type="room"
                  draggable={{
                    draggableId: 'abc',
                    draggableIndex: 1,
                  }}
                  header="Raum 1"
                >
                  <>
                    <SelectField
                      label="Thema"
                      options={rooms}
                      onSelect={setRoom}
                    ></SelectField>
                    <div className="relative my-4 w-full rounded">
                      {room.value === 'Magisches Klassenzimmer' && (
                        <QuestImagePlacer
                          img={
                            require('@/assets/rooms/abandoned-magic-classroom.jpg')
                              .default.src
                          }
                        />
                      )}
                      {room.value === 'Dunkles Musem' && (
                        <QuestImagePlacer
                          img={
                            require('@/assets/rooms/dark-museum.jpg').default
                              .src
                          }
                        />
                      )}
                      {room.value === 'Eigenes Foto hochladen' && (
                        <>
                          <FileUpload onChange={url => setImageUrl(url)} />
                          {imageUrl && <QuestImagePlacer img={imageUrl} />}
                        </>
                      )}
                    </div>
                  </>
                </Panel>
                <Panel
                  draggable={{
                    draggableId: 'def',
                    draggableIndex: 2,
                  }}
                  header="Raum 2"
                >
                  <>
                    <>
                      <FileUpload onChange={url => setImageUrl(url)} />
                      {imageUrl && <QuestImagePlacer img={imageUrl} />}
                    </>
                    <PillButton
                      variant="secondary"
                      startIcon={<PlusIcon className="h-8 w-8" />}
                      className="mx-auto"
                    >
                      Rätsel hinzufügen
                    </PillButton>
                  </>
                </Panel>

                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PillButton
        startIcon={<PlusIcon className="h-8 w-8" />}
        className="mx-auto"
      >
        Raum hinzufügen
      </PillButton>
    </div>
  )
}

export default Studio
