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
import { Button } from '@/components/Elements/Button'

export type gapElement = {
  key: number
  slot: mapItem[]
}

const PlayView = () => {
  const intl = useIntl()
  const text = useQuestStore(state => state.textList)
  const onSolve = useQuestStore(state => state.onSolve)
  const [cards, setCards] = useState(
    useQuestStore(state => state.shuffledAnswers),
  )
  const [correctLen, setCorrectLen] = useState(
    useQuestStore(state => state.correctAnswers).length,
  )
  const [slots, setSlots] = useState<gapElement[]>(() => {
    let list: any[] = []
    for (let i = 0; i < correctLen; i++) list[i] = { key: i, slot: [] }
    return list
  })

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
    }
  }

  return (
    <div className="mt-4">
      <p className="absolute top-0 mt-4">
        <FormattedMessage id={'quests.gapText.playView.taskPrompt'} />
      </p>
      <DragDropContext onDragEnd={result => onDragEnd(result)}>
        <div className="mb-4 flex w-full flex-row flex-wrap">
          {slots.map(item => (
            <Droppable key={item.key} droppableId={`${item.key}`}>
              {provided => (
                <div className="mt-2 flex flex-row">
                  <p className="mr-2">{text.at(item.key)}</p>
                  <div
                    ref={provided.innerRef}
                    className="my-auto mr-2 h-8 w-fit rounded-lg border px-4"
                    {...provided.droppableProps}
                  >
                    {item.slot.map((card, index) => (
                      <CardItem
                        provided={provided}
                        index={index}
                        item={card}
                        key={card.key}
                        className={'min-w-fix mx-auto rounded-lg text-center'}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
          <p className="mt-2 mr-2">
            {text.slice(correctLen, correctLen + 1)[0]}
          </p>
        </div>
        <div>
          <Droppable droppableId="-1">
            {provided => (
              <div
                ref={provided.innerRef}
                className="flex flex-row flex-wrap"
                {...provided.droppableProps}
              >
                {cards.map((card, index) => (
                  <CardItem
                    provided={provided}
                    index={index}
                    item={card}
                    key={card.key}
                    className={'min-w-fit rounded-lg border px-4 text-center'}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <Button
        className="mx-auto mt-4"
        onClick={() => {
          if (cards.length == correctLen) {
            const answers = slots.flatMap(item => item.slot[0].value)
            if (onSolve(answers)) {
              successToast(intl)
              successConfetti()
            } else {
              incorrectToast(intl)
            }
          } else {
            incorrectToast(intl)
          }
        }}
      >
        <FormattedMessage id="quests.gapText.playView.submit" />
      </Button>
    </div>
  )
}

type GapItemProps = {
  provided: DroppableProvided
  index: number
  item: mapItem
  className: string
}

const CardItem = ({
  provided,
  index,
  item,
  className,
  ...props
}: GapItemProps) => {
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
          className={className}
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
