import { PillButton } from '@/components/Elements/Button'
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
import { Quest } from '@prisma/client'
import { Instagram, Youtube } from 'react-feather'
import useQuests from '../api'
import QuestElement from './QuestElement'

type QuestTypeModalProps = {
  open: boolean
  quest: Quest
  roomId: string
  onClose: () => any
}

const QuestTypeModal = ({
  open,
  quest,
  roomId,
  onClose,
}: QuestTypeModalProps) => {
  const { updateQuest } = useQuests(roomId)

  return (
    <Modal open={open} onClose={onClose} title="Element hinzufügen">
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
            updateQuest(quest.id, {
              type: 'QUEST_CRYPTO',
            })
          }}
        />
        <QuestElement
          title="Programmieren"
          description="Hier muss ein kleines Programm geschrieben werden"
          icon={CodeIcon}
          variant="secondary"
          onClick={() => {
            updateQuest(quest.id, {
              type: 'QUEST_CODING',
            })
          }}
        />
        <QuestElement
          title="QR-Code Scan"
          description="Hier muss ein QR-Code gescannt werden"
          icon={QrcodeIcon}
          variant="secondary"
          onClick={() => {
            updateQuest(quest.id, {
              type: 'QUEST_QR_SCAN',
            })
          }}
        />
        <QuestElement
          title="Statistik"
          description="Hier muss eine Tabelle analysiert werden"
          icon={ChartSquareBarIcon}
          variant="secondary"
          onClick={() => {
            updateQuest(quest.id, {
              type: 'QUEST_STATISTICS',
            })
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
          onClick={() => {
            updateQuest(quest.id, {
              type: 'MEDIA_TEXT',
            })
          }}
        />
        <QuestElement
          title="Bild"
          description="Zeige ein Bild"
          icon={PhotographIcon}
          variant="tertiary"
          onClick={() => {
            updateQuest(quest.id, {
              type: 'MEDIA_IMAGE',
            })
          }}
        />
        <QuestElement
          title="Instagram"
          description="Ein Instagram Post"
          icon={Instagram}
          variant="tertiary"
          onClick={() => {
            updateQuest(quest.id, {
              type: 'MEDIA_INSTAGRAM',
            })
          }}
        />
        <QuestElement
          title="YouTube"
          description="Ein YouTube Video"
          icon={Youtube}
          variant="tertiary"
          onClick={() => {
            updateQuest(quest.id, {
              type: 'MEDIA_YOUTUBE',
            })
          }}
        />
        <QuestElement
          title="iFrame"
          description="Eine Website"
          icon={CodeIcon}
          variant="tertiary"
          onClick={() => {
            updateQuest(quest.id, {
              type: 'MEDIA_IFRAME',
            })
          }}
        />
      </>
    </Modal>
  )
}

export default QuestTypeModal
