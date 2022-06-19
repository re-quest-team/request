import { Button, PillButton } from '@/components/Elements/Button'
import { SelectOption } from '@/components/Elements/Select'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { Spacer } from '@/components/Elements/Spacer'
import Modal from '@/components/Modal'
import { Game, Prisma, Quest } from '@prisma/client'
import { SetStateAction, useState } from 'react'
import useQuests from '../api'
import QuestElement from './QuestElement'
import quests from '@/collections'
import { IQuest } from '@/collections/types'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { FormattedMessage, useIntl } from 'react-intl'

type QuestTypeModalProps = {
  open: boolean
  quest: Quest
  allQuest: Quest[]
  roomId: string
  onClose: () => any
}

const QuestTypeModal = ({
  open,
  quest,
  allQuest,
  roomId,
  onClose,
}: QuestTypeModalProps) => {
  const intl = useIntl()

  const taskVisibilityOptions: SelectOption[] = [
    {
      value: intl.formatMessage({
        id: 'features.quest.questTypeModal.atStart',
      }),
    },
    {
      value: intl.formatMessage({
        id: 'features.quest.questTypeModal.afterSolving',
      }),
    },
  ]

  const showAfterOptions: SelectOption[] = allQuest
    .filter(q => q.id !== quest.id && q.questId !== quest.id)
    .map(q => ({
      value:
        intl.formatMessage({ id: 'features.quest.questTypeModal.indexOf' }) +
        ': ' +
        allQuest.indexOf(q).toString(),
    }))

  const { updateQuest } = useQuests(roomId)

  const [questModalOpen, setQuestModalOpen] = useState(false)
  const [currentQuest, setCurrentQuest] = useState<IQuest<any>>()

  const getTaskVisOption = () => {
    if (quest.questId !== null) {
      return taskVisibilityOptions[1]
    } else {
      return taskVisibilityOptions[0]
    }
  }
  const [taskVisibility, setTaskVisibility] = useState(getTaskVisOption)
  const getShowAfterOption = () => {
    if (quest.questId !== null) {
      let questsIndexToPick = allQuest
        .filter(q => q.id !== quest.id && q.questId !== quest.id)
        .map(q => allQuest.indexOf(q))
      let questShowAfter = allQuest.filter(q => quest.questId === q.id)
      // @ts-ignore
      let indexShowAfter = allQuest.indexOf(questShowAfter.at(0))
      return showAfterOptions[questsIndexToPick.indexOf(indexShowAfter)]
    } else {
      return showAfterOptions[0]
    }
  }
  const [showAfterSelect, setShowAfterSelect] = useState(getShowAfterOption)
  console.log(showAfterSelect)

  const handleClick = async (q: IQuest<any>) => {
    // if quest already has data, load data into component
    if (quest.data) {
      q.onLoad(quest.data as any)
    }

    updateQuest(
      quest.id,
      {
        type: q.type,
      },
      intl,
    )
    setCurrentQuest(q)
    setQuestModalOpen(true)
  }

  const validate = async (data: any): Promise<boolean> => {
    switch (currentQuest?.type) {
      case 'QUEST_NUMBER_INPUT':
        return await valNumberInput.isValid(data)
      default:
        return true
    }
  }

  const onSave = async () => {
    const data = currentQuest?.onSave()

    updateQuest(
      quest.id,
      {
        data,
      },
      intl,
    )
    if (
      taskVisibility.value ===
      intl.formatMessage({
        id: 'features.quest.questTypeModal.afterSolving',
      })
    ) {
      let indexString = showAfterSelect.value.substring(
        showAfterSelect.value.indexOf(':') + 1,
      )
      let index = parseInt(indexString)
      const showAfter = allQuest.at(index)
      updateQuest(
        quest.id,
        {
          questId: showAfter?.id,
        },
        intl,
      )
    } else {
      updateQuest(
        quest.id,
        {
          questId: null,
        },
        intl,
      )
    }
    if (await validate(data)) {
      setQuestModalOpen(false)
      onClose()
      return
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={intl.formatMessage({
          id: 'features.quest.questTypeModal.titleAddElement',
        })}
        showBack={questModalOpen}
        onBack={() => setQuestModalOpen(false)}
      >
        <>
          {!questModalOpen && (
            <>
              <SelectField
                label={intl.formatMessage({
                  id: 'features.quest.questTypeModal.labelVisibility',
                })}
                options={taskVisibilityOptions}
                onSelect={setTaskVisibility}
              ></SelectField>
              {taskVisibility.value ===
                intl.formatMessage({
                  id: 'features.quest.questTypeModal.afterSolving',
                }) && (
                <SelectField
                  label={intl.formatMessage({
                    id: 'features.quest.questTypeModal.labelVisibleAfterQuest',
                  })}
                  options={showAfterOptions}
                  onSelect={setShowAfterSelect}
                ></SelectField>
              )}
              <PillButton variant="secondary" className="mx-auto">
                <FormattedMessage id="features.quest.questTypeModal.quest" />
              </PillButton>
              {quests(intl)
                .filter(q => q.type.includes('QUEST'))
                .map((q, i) => (
                  <QuestElement
                    key={i}
                    title={q.title}
                    description={q.description}
                    icon={q.icon}
                    variant="secondary"
                    onClick={() => {
                      handleClick(q)
                    }}
                  />
                ))}
              {/* <QuestElement
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
              />*/}
              <Spacer />
              <PillButton className="mx-auto" variant="tertiary">
                <FormattedMessage id="features.quest.questTypeModal.media" />
              </PillButton>
              {quests(intl)
                .filter(q => q.type.includes('MEDIA'))
                .map((q, i) => (
                  <QuestElement
                    key={i}
                    title={q.title}
                    description={q.description}
                    icon={q.icon}
                    variant="tertiary"
                    onClick={() => {
                      handleClick(q)
                    }}
                  />
                ))}
              {/* <QuestElement
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
              /> */}
            </>
          )}
          {questModalOpen && currentQuest && (
            <>
              <currentQuest.EditView />
              <Button variant="primary" onClick={onSave}>
                <FormattedMessage id="features.quest.questTypeModal.save" />
              </Button>
            </>
          )}
        </>
      </Modal>
    </>
  )
}

export default QuestTypeModal
