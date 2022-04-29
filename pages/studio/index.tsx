import type { NextPage } from 'next'
import Image from 'next/image'
import Panel from '@/components/Panel'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Button, PillButton } from '@/components/Elements/Button'
import {
  CameraIcon,
  ChartSquareBarIcon,
  CodeIcon,
  LockClosedIcon,
  MenuAlt1Icon,
  PhotographIcon,
  PlusIcon,
  QrcodeIcon,
} from '@heroicons/react/outline'
import { Instagram, Youtube } from 'react-feather'

import { Spacer } from '@/components/Elements/Spacer'
import { InputField, TextArea } from '@/components/Elements/Input'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { useState } from 'react'
import { SelectOption } from '@/components/Elements/Select'
import Modal from '@/components/Quest/Modal'

const Studio: NextPage = () => {
  const rooms: SelectOption[] = [
    { value: 'Magisches Klassenzimmer' },
    { value: 'Dunkles Musem' },
    { value: 'Eigenes Foto hochladen' },
    { value: 'Ohne Raum' },
  ]
  const [room, setRoom] = useState(rooms[0])

  const [modalOpen, setModalOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)

  const [encrypted, setEncrypted] = useState('')

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
                    <div className="relative my-4 w-full overflow-hidden rounded">
                      {room.value === 'Magisches Klassenzimmer' && (
                        <>
                          <Image
                            src={require('@/assets/rooms/abandoned-magic-classroom.jpg')}
                            layout="responsive"
                            alt="classroom"
                          ></Image>
                          <div className="absolute top-0 left-0 h-full w-full">
                            <div
                              className="absolute bottom-36 right-40 flex h-20 w-20 items-center justify-center rounded-xl border-4  border-white bg-white bg-opacity-50"
                              onClick={() => setModalOpen(true)}
                            >
                              <PlusIcon className="h-10 w-10" />
                            </div>
                            <div className="absolute top-36 left-40 flex h-20 w-20 flex-col items-center justify-center  rounded-xl border-4 border-white bg-flamingo bg-opacity-90  text-white">
                              <ChartSquareBarIcon className="h-12 w-12" />
                              {/* <p className="font-semibold">Statistik</p> */}
                            </div>
                            <div className="absolute bottom-[10%] right-[38%] flex h-20 w-20 items-center justify-center rounded-xl border-4 border-white bg-white bg-opacity-50">
                              <PlusIcon className="h-10 w-10" />
                            </div>
                          </div>
                        </>
                      )}
                      {room.value === 'Dunkles Musem' && (
                        <>
                          <Image
                            src={require('@/assets/rooms/dark-museum.jpg')}
                            layout="responsive"
                            alt="classroom"
                          ></Image>
                          <div className="absolute top-0 left-0 h-full w-full">
                            <div className="absolute right-[7%] bottom-[30%] flex h-20 w-20 items-center justify-center rounded-xl border-4  border-white bg-white bg-opacity-50">
                              <PlusIcon className="h-10 w-10" />
                            </div>
                            <div className="absolute bottom-36 left-28 flex h-20 w-20 items-center justify-center rounded-xl border-4  border-white bg-white bg-opacity-50">
                              <PlusIcon className="h-10 w-10" />
                            </div>
                            <div className="absolute bottom-[40%] right-[47%] flex h-20 w-20 items-center justify-center rounded-xl border-4  border-white bg-white bg-opacity-50">
                              <PlusIcon className="h-10 w-10" />
                            </div>
                          </div>
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
                    <span>Lorem ipsum</span>
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
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Element hinzufügen"
      >
        <>
          <h2 className="mx-auto w-full">Rätsel hinzufügen</h2>
          <div className="flex flex-row flex-wrap items-center justify-around">
            <div
              className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo"
              onClick={() => {
                setModalOpen(false)
                setTaskModalOpen(true)
              }}
            >
              <LockClosedIcon className="h-12 w-12" />
              <p className="font-semibold">Krypro&shy;graphie</p>
            </div>
            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <CodeIcon className="h-12 w-12" />
              <p className="font-semibold">Program&shy;mieren</p>
            </div>
            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <QrcodeIcon className="h-12 w-12" />
              <p className="font-semibold">QR-Code Scan</p>
            </div>

            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <ChartSquareBarIcon className="h-12 w-12" />
              <p className="font-semibold">Statistik</p>
            </div>
          </div>
          <h2 className="mx-auto w-full">Medien hinzufügen</h2>
          <div className="flex flex-row flex-wrap items-center justify-around">
            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <MenuAlt1Icon className="h-12 w-12" />
              <p className="font-semibold">Text</p>
            </div>
            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <PhotographIcon className="h-12 w-12" />
              <p className="font-semibold">Bild</p>
            </div>
            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <Instagram className="h-12 w-12" />
              <p className="font-semibold">Instagram</p>
            </div>
            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <Youtube className="h-12 w-12" />
              <p className="font-semibold">YouTube</p>
            </div>
            <div className="m-2 flex h-36 w-36 flex-col items-center justify-center  rounded-xl border-2 border-flamingo bg-flamingo bg-opacity-20 text-flamingo">
              <CodeIcon className="h-12 w-12" />
              <p className="font-semibold">iFrame</p>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        title="Kryptographie"
      >
        <div>
          <InputField
            label="Aufgabenstellung"
            value={
              'Das folgende Wort wurde mit ROT13 verschlüsselt. Kannst du es entschlüsseln?'
            }
          ></InputField>
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

export default Studio
