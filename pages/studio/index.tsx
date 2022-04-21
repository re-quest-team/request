import type { NextPage } from 'next'
import Panel from '@/components/Panel'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, PillButton } from '@/components/Elements/Button'
import { PlusCircleIcon } from '@heroicons/react/outline'
import { Spacer } from '@/components/Elements/Spacer'

const panels = []

const Studio: NextPage = () => {
  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
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
              className="z-10 my-4"
            >
              <Panel
                type="room"
                draggable={{
                  draggableId: 'abc',
                  draggableIndex: 1,
                }}
                header="Raum 1"
              >
                <>
                  <PillButton size="lg" variant="secondary" className="mx-auto">
                    Rätsel (1)
                  </PillButton>
                  <Panel type="quest" header="Rätsel 1">
                    <div>Nested Panel</div>
                  </Panel>
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
