import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const onSolve = useQuestStore(state => state.onSolve)
  const shuffledAnswers = useQuestStore(state => state.shuffledAnswers)

  const intl = useIntl()

  const [answer, setAnswer] = useState<string[]>([])

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAnswer(answer.concat(event.target.value).sort())
    } else {
      let index = answer.indexOf(event.target.value)
      setAnswer(answer.filter((word, i) => i !== index))
    }
  }

  return (
    <>
      <div className="flex-row justify-center">
        <p className="my-2 text-center text-3xl">{question}</p>
        <div></div>

        <h3 className="m-3 text-xl">
          <FormattedMessage id="quests.multipleChoice.playView.choices" />
        </h3>
        {shuffledAnswers.map(val => (
          <>
            <div className="m-2 text-base">
              <input
                type="checkbox"
                key={val.key}
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
          <FormattedMessage id="quests.multipleChoice.playView.submit" />
        </Button>
      </div>
    </>
  )
}

export default PlayView
