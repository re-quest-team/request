import type { NextPage } from 'next'
import Panel from '@/components/Panel'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Button, PillButton } from '@/components/Elements/Button'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { Spacer } from '@/components/Elements/Spacer'
import { InputField, TextArea } from '@/components/Elements/Input'
import { SelectField } from '@/components/Elements/Select/SelectField'

const Studio: NextPage = () => {
  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
      <div className="mx-auto md:max-w-4xl">
        <InputField label="Name"></InputField>
        <TextArea label="Beschreibung" rows={4} />
        <SelectField
          label="Thema"
          options={[
            { value: 'Museum' },
            { value: 'Verlies' },
            { value: 'Nervenklinik' },
          ]}
        ></SelectField>
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
                    <PillButton
                      size="lg"
                      variant="secondary"
                      className="mx-auto"
                    >
                      Rätsel (3)
                    </PillButton>
                    <div className="relative py-4">
                      <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full justify-center">
                        <div className="h-full w-6 bg-flamingo bg-opacity-50"></div>
                      </div>
                      <div className="relative">
                        <Panel type="quest" header="Rätsel 1">
                          <div>Nested Panel</div>
                        </Panel>
                        <Panel type="quest" header="Rätsel 2">
                          <div>Nested Panel</div>
                        </Panel>
                        <Panel type="quest" header="Rätsel 3">
                          <div>Nested Panel</div>
                        </Panel>
                      </div>
                    </div>
                    <PillButton
                      variant="secondary"
                      startIcon={<PlusCircleIcon className="h-8 w-8" />}
                      className="mx-auto"
                    >
                      Rätsel hinzufügen
                    </PillButton>
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
                    <span>Lorem ipsum</span>
                    <PillButton
                      variant="secondary"
                      startIcon={<PlusCircleIcon className="h-8 w-8" />}
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
        startIcon={<PlusCircleIcon className="h-8 w-8" />}
        className="mx-auto"
      >
        Raum hinzufügen
      </PillButton>
    </div>
  )
}

export default Studio
