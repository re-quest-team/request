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

  const [modalOpen, setModalOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)

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
              setModalOpen(true)
              createQuest({
                x:
                  (e.clientX - ref.current?.getBoundingClientRect().left!) /
                  ref.current?.clientWidth!,
                // @ts-ignore
                y:
                  (e.clientY - ref.current?.getBoundingClientRect().top!) /
                  ref.current?.clientHeight!,
              })
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
              {...q}
              onMoveEnd={async movedQuest => updateQuest(q.id, movedQuest)}
              onDelete={async () => deleteQuest(q.id)}
              key={i}
              showDelete={editMode}
              onClick={() => setModalOpen(true)}
            />
          ))}
        </div>
      </div>
      <Spacer />
      <PillButton variant="secondary" className="mx-auto">
        {quests.length} von {maxQuests} Rätseln
      </PillButton>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Element hinzufügen"
      >
        <>
          <PillButton variant="secondary" className="mx-auto">
            Rätsel
          </PillButton>
          <QuestElement
            title="Krypto&shy;graphie"
            description="Hier muss ein Codewort entschlüsselt werden"
            icon={LockClosedIcon}
            variant="secondary"
            onClick={() => {
              setModalOpen(false)
              setTimeout(() => {
                setTaskModalOpen(true)
              }, 100)
            }}
          />
          <QuestElement
            title="Programmieren"
            description="Hier muss ein kleines Programm geschrieben werden"
            icon={CodeIcon}
            variant="secondary"
            onClick={() => {
              setModalOpen(false)
              setTimeout(() => {
                setTaskModalOpen(true)
              }, 100)
            }}
          />
          <QuestElement
            title="QR-Code Scan"
            description="Hier muss ein QR-Code gescannt werden"
            icon={QrcodeIcon}
            variant="secondary"
            onClick={() => {
              setModalOpen(false)
              setTimeout(() => {
                setTaskModalOpen(true)
              }, 100)
            }}
          />
          <QuestElement
            title="Statistik"
            description="Hier muss eine Tabelle analysiert werden"
            icon={ChartSquareBarIcon}
            variant="secondary"
            onClick={() => {
              setModalOpen(false)
              setTimeout(() => {
                setTaskModalOpen(true)
              }, 100)
            }}
          />
          <Spacer />
          <PillButton className="mx-auto" variant="tertiary">
            Medien
          </PillButton>
          <QuestElement
            title="Text"
            description="Ein einfacher Text"
            icon={MenuAlt1Icon}
            variant="tertiary"
            onClick={() => {}}
          />
          <QuestElement
            title="Bild"
            description="Zeige ein Bild"
            icon={PhotographIcon}
            variant="tertiary"
            onClick={() => {}}
          />
          <QuestElement
            title="Instagram"
            description="Ein Instagram Post"
            icon={Instagram}
            variant="tertiary"
            onClick={() => {}}
          />
          <QuestElement
            title="YouTube"
            description="Ein YouTube Video"
            icon={Youtube}
            variant="tertiary"
            onClick={() => {}}
          />
          <QuestElement
            title="iFrame"
            description="Eine Website"
            icon={CodeIcon}
            variant="tertiary"
            onClick={() => {}}
          />
        </>
      </Modal>
      <Modal
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
      </Modal>
    </div>
  )
}

export default QuestImagePlacer
