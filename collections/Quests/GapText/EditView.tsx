import { InputField, TextArea } from '@/components/Elements/FormElements'
import { mapItem, useQuestStore } from './store'
import { useIntl } from 'react-intl'
import React from 'react'

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

  const handleTextInput = (value: string) => {
    // split with '[...]' as delimiter
    const text = value.split(/\s*\[.*?\]\s*/gm)
    // extract everything within any '[]'
    const answers = value.replaceAll('][', '] [').split(/(?=\]|^).*?(?:\[|$)/gm)
    setText(value)
    setTextList(text)
    setCorrect(answers.slice(1, answers.length - 1))
    shuffle()
  }

  const handleWrongInput = (value: string) => {
    setWrong(value.split(','))
    shuffle()
  }

  return (
    <div>
      <div className="mt-4">
        <TextArea
          label={intl.formatMessage({
            id: 'quests.gaptext.editView.correctTitle',
          })}
          placeholder={intl.formatMessage({
            id: 'quests.gaptext.editView.correctPlaceholder',
          })}
          defaultValue={text}
          onChange={e => handleTextInput(e.target.value)}
        />
        <InputField
          disabled
          placeholder={intl.formatMessage({
            id: 'quests.gaptext.editView.correctTip',
          })}
        />
        <p></p>
      </div>

      <div className="mt-4">
        <TextArea
          label={intl.formatMessage({
            id: 'quests.gaptext.editView.falseTitle',
          })}
          placeholder={intl.formatMessage({
            id: 'quests.gaptext.editView.falsePlaceholder',
          })}
          defaultValue={wrong}
          onChange={e => handleWrongInput(e.target.value)}
        />
      </div>
    </div>
  )
}

export default EditView
