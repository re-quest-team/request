/* eslint-disable @next/next/no-img-element */
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/outline'
import useMouse from '@react-hook/mouse-position'
import { useEffect, useRef, useState } from 'react'
import { Button, PillButton } from '../Elements/Button'
import { Spacer } from '../Elements/Spacer'
import Toggle from '../Elements/Toggle'

type QuestImagePlacerProps = {
  img: string
  maxQuests?: number
}

type QuestButton = {
  x: number
  y: number
}

const QuestImagePlacer = ({ img, maxQuests = 3 }: QuestImagePlacerProps) => {
  const ref = useRef(null)
  const mouse = useMouse(ref)

  const [quests, setQuests] = useState<QuestButton[]>([])

  const [editMode, setEditMode] = useState(false)
  return (
    <div>
      <Toggle
        label="Rätsel platzieren"
        onChange={e => setEditMode(!editMode)}
      />
      <PillButton variant="secondary" className="mx-auto">
        {quests.length} von {maxQuests} Rätseln
      </PillButton>
      <Spacer />
      <div
        className={`relative w-full overflow-visible ${
          editMode && quests.length < maxQuests && 'cursor-crosshair'
        }`}
      >
        <img
          src={img}
          onClick={() => {
            if (editMode && quests.length < maxQuests) {
              setQuests([
                ...quests,
                {
                  // @ts-ignore
                  x: mouse.x / mouse.elementWidth,
                  // @ts-ignore
                  y: mouse.y / mouse.elementHeight,
                },
              ])
            }
          }}
          alt="upload"
          ref={ref}
        />
        <div
          className={`pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center transition-all ${
            editMode && 'bg-black bg-opacity-30'
          }`}
        >
          {editMode && quests.length === 0 && (
            <div className="m-auto flex flex-col items-center">
              <PlusCircleIcon className="mb-4 h-10 w-10" />
              <p className="font-semibold">
                Platziere Rätsel mit einem Klick auf dem Bild
              </p>
            </div>
          )}
          {quests?.map((q, i) => (
            <div
              className={`pointer-events-auto absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-4 border-white bg-white bg-opacity-50`}
              style={{ top: `${q.y * 100}%`, left: `${q.x * 100}%` }}
              key={i}
              onClick={() => {
                if (editMode)
                  setQuests([...quests.filter((e, index) => index !== i)])
              }}
            >
              <PlusIcon className="h-10 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestImagePlacer
