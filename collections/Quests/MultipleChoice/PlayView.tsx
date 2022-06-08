import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const correctAnswer = useQuestStore(state => state.correctAnswer)
  const wrongAnswers = useQuestStore(state => state.wrongAnswers)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)
  const shuffledAnswers = useQuestStore(state => state.shuffledAnswers)

  const intl = useIntl()

  const [answer, setAnswer] = useState('')

  const [selectedAnswer, setSelectedAnswer] = useState<String>()

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value)
    setAnswer(event.target.value)
  }

  return (
    <>
      <div className="flex-row justify-center">
        <p className="my-2 text-center text-3xl">{question}</p>
        <div></div>

        <h3 className="m-3 text-xl">Antwortmöglichkeiten:</h3>
        {shuffledAnswers.map(val => (
          <>
            <div className="m-2 text-base">
              <input
                type="radio"
                id={val.name}
                name="answer"
                value={val.name}
                onChange={radioHandler}
              ></input>
              <label htmlFor={val.name}>{val.name}</label>
            </div>
          </>
        ))}
        <Button
          className="m-15 mx-auto"
          onClick={() => {
            if (onSolve(answer)) {
              successToast(intl)
              successConfetti()
            } else {
              incorrectToast(intl)
            }
          }}
        >
          <FormattedMessage id="Abgeben" />
        </Button>
      </div>
    </>
  )
}

export default PlayView
