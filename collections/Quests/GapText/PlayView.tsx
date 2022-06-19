import { successConfetti } from '@/components/Confetti'
import { mapItem, useQuestStore } from './store'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { incorrectToast, successToast } from '@/components/Toasts'

export type gapElement = {
  key: number
  text: string
  slot: mapItem[]
}

const PlayView = () => {
  const intl = useIntl()
  const text = useQuestStore(state => state.textList)
  const onSolve = useQuestStore(state => state.onSolve)
  const [cards, setCards] = useState(
    useQuestStore(state => state.shuffledAnswers),
  )
  const [slots, setSlots] = useState<gapElement[]>(
    text.map(txt => ({ key: txt.key, text: txt.value, slot: [] })),
  )
  const [checkAt, setCheckAt] = useState(cards.length - text.length)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const srcId = parseInt(result.source.droppableId)
    const destId = parseInt(result.destination.droppableId)
    const dragId = parseInt(result.draggableId)
    let tmpSlots = slots
    let tmpCards = cards

    if (srcId !== destId && !isNaN(srcId) && !isNaN(destId) && !isNaN(dragId)) {
      const destSlot = tmpSlots[destId]
      const srcSlot = slots[srcId]

      if (srcId == -1 && destId >= 0) {
        // Bottom box to top box
        tmpCards = tmpCards.filter(card => card.key !== dragId)
        if (destSlot.slot.length !== 0)
          tmpCards = tmpCards.concat(destSlot.slot)
        destSlot.slot = cards.filter(card => card.key == dragId)
      } else if (destId == -1) {
        // Top box to bottom box
        tmpCards = tmpCards.filter(card => card.key !== dragId)
        if (srcSlot.slot.length !== 0) tmpCards = tmpCards.concat(srcSlot.slot)
        srcSlot.slot = cards.filter(card => card.key == dragId)
      } else {
        // Top box to top box
        const destCard = destSlot.slot
        destSlot.slot = srcSlot.slot
        srcSlot.slot = destCard
      }
      setSlots(tmpSlots)
      setCards(tmpCards)

      if (tmpCards.length == checkAt) {
        // Check if won
        const answers = slots.flatMap(item => item.slot[0].value)
        if (onSolve(answers)) {
          successToast(intl)
          successConfetti()
        } else {
          incorrectToast(intl)
        }
      }
    }
  }

  return (
    <div className="mt-4">
      <p className="absolute top-0 mt-4">
        <FormattedMessage id={'quests.gaptext.playView.taskPrompt'} />
      </p>
      <DragDropContext onDragEnd={result => onDragEnd(result)}>
        <div className="mb-4 flex flex-row flex-wrap">
          {slots.map(item => (
            <div key={`txt-${item.key}`} className="flex flex-row flex-wrap">
              <p className="mr-2">{`${item.text}`}</p>
              <Droppable droppableId={`${item.key}`}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    className="mr-2 w-20 rounded-lg border bg-zinc-900"
                    {...provided.droppableProps}
                  >
                    {item.slot.map((card, index) => (
                      <CardItem
                        provided={provided}
                        index={index}
                        item={card}
                        key={card.key}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
        <div>
          <Droppable droppableId="-1">
            {provided => (
              <div
                ref={provided.innerRef}
                className="flex flex-row"
                {...provided.droppableProps}
              >
                {cards.map((card, index) => (
                  <CardItem
                    provided={provided}
                    index={index}
                    item={card}
                    key={card.key}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

type GapItemProps = {
  provided: DroppableProvided
  index: number
  item: mapItem
}

const CardItem = ({ provided, index, item, ...props }: GapItemProps) => {
  return (
    <Draggable
      key={item.key}
      draggableId={`${item.key}`}
      index={index}
      {...provided.droppableProps}
    >
      {provided => (
        <div
          ref={provided.innerRef}
          className="mx-auto min-w-fit max-w-full rounded-lg border px-4 text-center shadow"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...props}
        >
          {item.value}
        </div>
      )}
    </Draggable>
  )
}

export default PlayView
