import { PillButton } from '@/components/Elements/Button'
import { SelectOption } from '@/components/Elements/Select'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { Spacer } from '@/components/Elements/Spacer'
import Modal from '@/components/Modal'
import {
  LockClosedIcon,
  CodeIcon,
  QrcodeIcon,
  ChartSquareBarIcon,
  MenuAlt1Icon,
  PhotographIcon,
} from '@heroicons/react/outline'
import { Quest, QuestType } from '@prisma/client'
import { useState } from 'react'
import { Instagram, Youtube } from 'react-feather'
import useQuests from '../api'
import QuestElement from './QuestElement'
import CryptoTask from './QuestTask/CryptoTask'

type QuestTypeModalProps = {
  open: boolean
  quest: Quest
  roomId: string
  onClose: () => any
}

const taskVisibilityOptions: SelectOption[] = [
  { value: 'Beim Start' },
  { value: 'Nach dem Lösen eines Quests' },
]

const QuestTypeModal = ({
  open,
  quest,
  roomId,
  onClose,
}: QuestTypeModalProps) => {
  const { updateQuest } = useQuests(roomId)

  const [questModalOpen, setQuestModalOpen] = useState(false)
  const [currentType, setCurrentType] = useState<QuestType>()

  const [taskVisibility, setTaskVisibility] = useState(taskVisibilityOptions[0])

  const handleClick = (type: QuestType) => {
    console.log('handle click for', type)
    updateQuest(quest.id, {
      type: type,
    })
    setCurrentType(type)
    setQuestModalOpen(true)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Element hinzufügen"
        showBack={questModalOpen}
        onBack={() => setQuestModalOpen(false)}
      >
        <>
          {!questModalOpen && (
            <>
              <SelectField
                label="Sichbarkeit"
                options={taskVisibilityOptions}
                onSelect={setTaskVisibility}
              ></SelectField>
              {taskVisibility.value === 'Nach dem Lösen eines Quests' && (
                <SelectField
                  label="Sichbar mach Quest"
                  options={[{ value: '1' }, { value: '2' }]}
                  onSelect={() => {}}
                ></SelectField>
              )}
              <PillButton variant="secondary" className="mx-auto">
                Rätsel
              </PillButton>
              <QuestElement
                title="Krypto&shy;graphie"
                description="Hier muss ein Codewort entschlüsselt werden"
                icon={LockClosedIcon}
                variant="secondary"
                onClick={() => {
                  handleClick('QUEST_CRYPTO')
                }}
              />
              <QuestElement
                title="Programmieren"
                description="Hier muss ein kleines Programm geschrieben werden"
                icon={CodeIcon}
                variant="secondary"
                onClick={() => handleClick('QUEST_CODING')}
              />
              <QuestElement
                title="QR-Code Scan"
                description="Hier muss ein QR-Code gescannt werden"
                icon={QrcodeIcon}
                variant="secondary"
                onClick={() => handleClick('QUEST_QR_SCAN')}
              />
              <QuestElement
                title="Statistik"
                description="Hier muss eine Tabelle analysiert werden"
                icon={ChartSquareBarIcon}
                variant="secondary"
                onClick={() => handleClick('QUEST_STATISTICS')}
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
                onClick={() => handleClick('MEDIA_TEXT')}
              />
              <QuestElement
                title="Bild"
                description="Zeige ein Bild"
                icon={PhotographIcon}
                variant="tertiary"
                onClick={() => handleClick('MEDIA_IMAGE')}
              />
              <QuestElement
                title="Instagram"
                description="Ein Instagram Post"
                icon={Instagram}
                variant="tertiary"
                onClick={() => handleClick('MEDIA_INSTAGRAM')}
              />
              <QuestElement
                title="YouTube"
                description="Ein YouTube Video"
                icon={Youtube}
                variant="tertiary"
                onClick={() => handleClick('MEDIA_YOUTUBE')}
              />
              <QuestElement
                title="iFrame"
                description="Eine Website"
                icon={CodeIcon}
                variant="tertiary"
                onClick={() => handleClick('MEDIA_IFRAME')}
              />
            </>
          )}
          {questModalOpen && currentType === 'QUEST_CRYPTO' && <CryptoTask />}
        </>
      </Modal>
    </>
  )
}

export default QuestTypeModal
