import { Button, PillButton } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import React, { useCallback, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuestStore } from './store'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const correctAnswer = useQuestStore(state => state.correctAnswer)
  const setCorrectAnswer = useQuestStore(state => state.setCorrectAnswer)

  const wrongAnswers = useQuestStore(state => state.wrongAnswers)
  const setWrongAnswers = useQuestStore(state => state.setWrongAnswers)

  const shuffledAnswers = useQuestStore(state => state.shuffledAnswers)
  const setShuffledAnswers = useQuestStore(state => state.setShuffledAnswers)

  const replaceAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    var answers = wrongAnswers

    answers[i - 1] = { key: i, name: event.target.value }

    setWrongAnswers(answers)

    const pureAnswers = wrongAnswers.filter(
      (item: { key: number; name: string }) => item.name !== '',
    )

    const allAnswers = pureAnswers.concat([{ key: 0, name: correctAnswer }])
    setShuffledAnswers(shuffle(allAnswers))
  }

  function shuffle(array: { key: number; name: string }[]) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
    return array
  }

  console.log(wrongAnswers)

  return (
    <div>
      <InputField
        label="Aufgabenstellung"
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <InputField
        label="richtige Antwort"
        defaultValue={correctAnswer}
        onChange={e => setCorrectAnswer(e.target.value)}
      />
      <div id="refWrong" />

      {wrongAnswers.map(val => (
        <InputField
          key={val.key}
          label="falsche Antwort"
          defaultValue={val.name}
          onChange={e => replaceAnswer(e, val.key)}
        />
      ))}
      <div className="my-4 flex">
        <PillButton
          className=" my-3 mx-auto  h-10 w-10 content-center"
          variant="tertiary"
          onClick={() =>
            setWrongAnswers(
              wrongAnswers.concat({ key: wrongAnswers.length + 1, name: '' }),
            )
          }
        >
          <PlusCircleIcon className="m-2 h-5 w-5 " />
        </PillButton>
        <PillButton
          className="hover:fley-row-reverse reverse my-3 mx-auto h-10 w-10 content-center"
          variant="secondary"
          onClick={() =>
            setWrongAnswers(wrongAnswers.slice(0, wrongAnswers.length - 1))
          }
        >
          <MinusCircleIcon className="m-2 h-5 w-5 " />
        </PillButton>
      </div>
    </div>
  )
}

export default EditView
