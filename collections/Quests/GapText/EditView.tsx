import { InputField, TextArea } from '@/components/Elements/FormElements'
import { mapItem, useQuestStore } from './store'
import { useIntl } from 'react-intl'
import React, { ChangeEvent } from 'react'
import { PillButton } from '@/components/Elements/Button'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Units } from '@/collections/Quests/NumberInput/units'

const EditView = () => {
  const intl = useIntl()

  const text = useQuestStore(state => state.text)
  const setText = useQuestStore(state => state.setText)

  const setTextList = useQuestStore(state => state.setTextList)

  const correct = useQuestStore(state => state.correctAnswers)
  const setCorrect = useQuestStore(state => state.setCorrectAnswers)

  const wrong = useQuestStore(state => state.wrongAnswers)
  const setWrong = useQuestStore(state => state.setWrongAnswers)

  const setShuffled = useQuestStore(state => state.setShuffledAnswers)

  const appendGap = () => {
    const len = text.length
    setText(text.concat({ key: len, value: '' }))
    setCorrect(correct.concat({ key: len, value: '' }))
  }

  const popGap = () => {
    const len = text.length - 1
    if (len > 0) {
      setText(text.slice(0, len))
      setCorrect(correct.slice(0, len))
    }
  }

  function shuffle() {
    let shuffled = wrong.concat(correct)

    // >>>>>>> Algorithm src: https://stackoverflow.com/a/2450976
    let currentIndex = shuffled.length,
      randomIndex
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      // And swap it with the current element.
      ;[shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ]
    }
    // <<<<<<<

    // randomize the IDs to prevent cheating with Browser DevTools
    let obfuscated: mapItem[] = []
    shuffled.map(
      str =>
        (obfuscated = obfuscated.concat({
          key: obfuscated.length,
          value: str.trim(),
        })),
    )
    setShuffled(obfuscated)
  }

  const handleWrongAnswerInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const list = e.target.value.split(',')
    setWrong(list)
    shuffle()
  }

  const handleWrongInput = (value: string) => {
    setWrong(value.split(','))
    shuffle()
  }

  return (
    <div>
      <div className="flex flex-col border-b-2 border-zinc-400">
        {correct &&
          text.map(txt => (
            <div key={txt.key}>
              <TextArea
                placeholder="Text"
                defaultValue={txt.value}
                onChange={e => (text[txt.key].value = e.target.value)}
              />
              <InputField
                type={'text'}
                unit={Units.None}
                placeholder={intl.formatMessage({
                  id: 'quests.gaptext.editView.answer',
                })}
                defaultValue={correct[txt.key].value}
                onChange={e =>
                  handleCorrectAnswerInput(txt.key, e.target.value.trim())
                }
              />
            </div>
          ))}
        <div className="mb-4 flex">
          <PillButton
            className="mx-auto h-10 w-10"
            variant="tertiary"
            onClick={() => appendGap()}
          >
            <PlusCircleIcon className="m-auto h-5 w-5 " />
          </PillButton>
          <PillButton
            className="mx-auto h-10 w-10"
            variant="secondary"
            onClick={() => popGap()}
          >
            <MinusCircleIcon className="m-auto h-5 w-5 " />
          </PillButton>
        </div>
      </div>

      <div className="mt-4">
        <TextArea
          label={intl.formatMessage({
            id: 'quests.gaptext.editView.falseAnswers',
          })}
          placeholder={intl.formatMessage({
            id: 'quests.gaptext.editView.placeholder',
          })}
          defaultValue={wrong}
          onChange={e => handleWrongInput(e.target.value)}
        />
      </div>
    </div>
  )
}

export default EditView
