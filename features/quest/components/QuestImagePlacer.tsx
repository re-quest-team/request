/* eslint-disable @next/next/no-img-element */
import { Button, PillButton } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { Spacer } from '@/components/Elements/Spacer'
import Modal from '@/components/Modal'
import {
  ChartSquareBarIcon,
  CodeIcon,
  LockClosedIcon,
  MenuAlt1Icon,
  PhotographIcon,
  PlusCircleIcon,
  QrcodeIcon,
} from '@heroicons/react/outline'
import { Quest } from '@prisma/client'
import { useRef, useState } from 'react'
import { ArrowUpRight, Instagram, Youtube } from 'react-feather'
import useQuests from '../api'
import AddQuestButton from './AddQuestButton'
import QuestElement from './QuestElement'
import QuestTypeModal from './QuestTypeModal'

type QuestImagePlacerProps = {
  img: string
  quests: Quest[]
  roomId: string
  maxQuests?: number
}

type QuestButton = {
  x: number
  y: number
  type?: 'default' | 'quest' | 'media'
}

const QuestImagePlacer = ({
  img,
  quests,
  roomId,
  maxQuests = 3,
}: QuestImagePlacerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [editMode, setEditMode] = useState(true)

  const [questModalOpen, setQuestModalOpen] = useState(false)
  const [currentQuest, setCurrentQuest] = useState<Quest>()
  const [encrypted, setEncrypted] = useState('')

  const { createQuest, updateQuest, deleteQuest } = useQuests(roomId)

  return (
    <div>
      <Button
        size="xs"
        className="ml-auto"
        onMouseDown={() => setEditMode(false)}
        onMouseUp={() => setEditMode(true)}
      >
        Vorschau
      </Button>
      <Spacer size="xs" />
      <div
        className={`relative mx-auto w-full max-w-6xl overflow-visible ${
          editMode && quests.length < maxQuests && 'cursor-crosshair'
        }`}
        ref={ref}
      >
        <img
          className="select-none rounded shadow"
          src={img}
          onClick={async e => {
            if (editMode && quests.length < maxQuests) {
              const newQuest = await createQuest({
                x:
                  (e.clientX - ref.current?.getBoundingClientRect().left!) /
                  ref.current?.clientWidth!,
                // @ts-ignore
                y:
                  (e.clientY - ref.current?.getBoundingClientRect().top!) /
                  ref.current?.clientHeight!,
              })
              setCurrentQuest(newQuest)
              setQuestModalOpen(true)
            }
          }}
          alt="upload"
          onDrop={e => e.preventDefault()}
          onDragOver={e => e.preventDefault()}
        />
        <div
          className={`pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center transition-all ${
            editMode && 'bg-black bg-opacity-40'
          }`}
        >
          {editMode && quests.length === 0 && (
            <>
              <div className="relative m-auto flex flex-col items-center">
                <PlusCircleIcon className="mb-4 h-10 w-10" />
                <p className="font-semibold">
                  Klicke auf das Bild um Rätsel hinzuzufügen
                </p>
              </div>
              <div className="absolute top-0 right-0 flex max-w-sm content-end items-end p-4">
                <p className="mr-2 text-sm">
                  Halte den Vorschau Button gedrückt um eine Vorschau deines
                  Raumes zu sehen
                </p>
                <ArrowUpRight className="h-10 w-12" />
              </div>
            </>
          )}
          {quests?.map((q, i) => (
            <AddQuestButton
              dragRef={ref}
              x={q.x}
              y={q.y}
              type={q.type || undefined}
              onMoveEnd={async movedQuest => updateQuest(q.id, movedQuest)}
              onDelete={async () => deleteQuest(q.id)}
              key={i}
              showDelete={editMode}
              onClick={() => {
                setCurrentQuest(q)
                setQuestModalOpen(true)
              }}
            />
          ))}
        </div>
      </div>
      <Spacer />
      <PillButton variant="secondary" className="mx-auto">
        {quests.length} von {maxQuests} Rätseln
      </PillButton>

      {currentQuest && (
        <QuestTypeModal
          open={questModalOpen}
          roomId={roomId}
          quest={currentQuest}
          onClose={() => {
            setCurrentQuest(undefined)
            setQuestModalOpen(false)
          }}
        />
      )}

      {/* <Modal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        title="Kryptographie"
      >
        <div>
          <InputField label="Aufgabenstellung"></InputField>
          <InputField
            label="Codewort"
            onChange={e => setEncrypted(e.target.value)}
          ></InputField>
          <InputField
            label="Verschlüsseltes Wort"
            disabled
            value={encrypted.replace(
              /[A-Z]/gi,
              c =>
                'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'[
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(
                    c,
                  )
                ],
            )}
          ></InputField>
          <Button variant="primary" onClick={() => setTaskModalOpen(false)}>
            Speichern
          </Button>
        </div>
      </Modal> */}
    </div>
  )
}

export default QuestImagePlacer
