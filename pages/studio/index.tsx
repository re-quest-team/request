import type { NextPage } from 'next'
import Panel from '@/components/Panel'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const panels = []

const Studio: NextPage = () => {
  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
      <DragDropContext onDragEnd={result => console.log(result)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Panel
                type="room"
                draggable={{
                  draggableId: 'abc',
                  draggableIndex: 1,
                }}
                header="Raum 1"
              >
                <Panel type="quest" header="Rätsel 1">
                  <div>Nested Panel</div>
                </Panel>
              </Panel>
              <Panel
                draggable={{
                  draggableId: 'def',
                  draggableIndex: 2,
                }}
                header="Raum 2"
              >
                <span>Lorem ipsum</span>
              </Panel>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Studio
